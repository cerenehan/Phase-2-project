import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { ReviewItem } from './Review-Item';
import "./review.css";



function Review({ addressData, paymentData }) {
  const last4Digits = paymentData.cardNumber.slice(-4);
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const cardTypes = ["Visa", "MasterCard", "American Express", "China UnionPay"];
  const randomIndex = Math.floor(Math.random() * cardTypes.length);
  const randomCardType = cardTypes[randomIndex];

  const payments = [
    { name: 'Card type', detail: randomCardType },
    { name: 'Card holder', detail: `${paymentData.cardName}` },
    { name: 'Card number', detail: `**** **** **** ${last4Digits}` },
    { name: 'Expiry date', detail: `${paymentData.expDate}` },
];
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartItems.map((cartItem) => {
                return <ReviewItem data={cartItem} key={cartItem.id}/>;
          })}
          <ListItem key={ReviewItem.name} sx={{ py: 1, px: 0 }}>
            
            <Typography variant="body2">{ReviewItem.price}</Typography>
          </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${totalAmount}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{addressData.firstName} {addressData.lastName}</Typography>
          <Typography gutterBottom>
            {addressData.address1}, {addressData.address2}, {addressData.city}, {addressData.state}, {addressData.zip}, {addressData.country}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
export default Review;