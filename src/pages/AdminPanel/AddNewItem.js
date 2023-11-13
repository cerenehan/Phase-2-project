import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AddchartIcon from '@mui/icons-material/Addchart';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useShopContext } from '../../context/shop-context';
import Paper from '@mui/material/Paper';


function AddNewItem({theme}) {
  const { addNewItemAndRefreshProducts } = useShopContext();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const newItem = {
      title: formData.title,
      price: formData.price,
      category: formData.category,
      image: formData.image,
    };

    fetch('http://localhost:3001/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => {
        if (response.ok) {
          setFormData({
            title: "",
            price: "",
            category: "",
            image: "",
          });
          return response.json();
        } else {
          throw new Error('Failed to add the new item');
        }
      })
      .then((data) => {
        console.log('Successfully added the new item:', data);
       addNewItemAndRefreshProducts(newItem);
        
      })
      .catch((error) => {
        console.error('Error while adding the new item:', error);
      });
  };

  return (
    <Paper className={`addNewItem-page ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AddchartIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Item Input
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoFocus
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="Price"
              id="price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="category"
              label="Category"
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
              <TextField
              margin="normal"
              required
              fullWidth
              name="image"
              label="Image URL"
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add New Item
            </Button>
          </Box>
        </Box>
      </Container>
    </Paper>
  );
}
export default AddNewItem;