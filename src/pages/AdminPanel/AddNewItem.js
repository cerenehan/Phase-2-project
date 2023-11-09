import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddchartIcon from '@mui/icons-material/Addchart';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const defaultTheme = createTheme();

function AddNewItem() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      title: data.get('title'),
      price: data.get('price'),
      category: data.get('category'),
      image: data.get('image'),
    });
    const newItem = {
      title: data.get('title'),
      price: data.get('price'),
      category: data.get('category'),
      image: data.get('image'),
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
          return response.json();
        } else {
          throw new Error('Failed to add the new item');
        }
      })
      .then((data) => {
        console.log('Successfully added the new item:', data);
      })
      .catch((error) => {
        console.error('Error while adding the new item:', error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="Price"
              id="price"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="category"
              label="Category"
              id="category"
            />
              <TextField
              margin="normal"
              required
              fullWidth
              name="image"
              label="Image URL"
              id="image"
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
    </ThemeProvider>
  );
}
export default AddNewItem;