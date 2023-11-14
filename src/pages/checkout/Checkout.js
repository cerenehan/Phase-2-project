import React, { useState, useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useShopContext } from '../../context/shop-context';
let x = Math.round(Math.random() * 1000000);

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
      Virtual Treasures
      </Link>{' '}
      {new Date().getFullYear()}
      
    </Typography>
  );
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];

export default function ExtraCheckout() {
  const cardTypes = ["Visa", "MasterCard", "American Express", "China UnionPay"];
  const randomIndex = Math.floor(Math.random() * cardTypes.length);
  const randomCardType = cardTypes[randomIndex];
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const [paymentData, setPaymentData] = useState({
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  });
  const [addressData, setAddressData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const handleAddressDataChange = (newAddressData) => {
    setAddressData(newAddressData);
  };

  const handlePaymentDataChange = (newPaymentData) => {
    setPaymentData(newPaymentData);
  };

  const { deleteCart } = useShopContext();

  const [formData, setFormData] = useState({
    Date: "",
    Name: "",
    "Ship TO City": "",
    'Ship to State': "",
    'Payment Method': "", 
    'Sale Amount': "",
    'Credit Card Number': "",
  });

    const newItem = {
      Date: new Date().toISOString().slice(0, 10), 
      Name: `${addressData.firstName} ${addressData.lastName}`,
      'Ship TO City': addressData.city,
      'Ship to State': addressData.state,
      'Payment Method': randomCardType, 
      'Sale Amount': `$${totalAmount}`,
      'Credit Card Number': paymentData.cardNumber,
    };

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      try {
        const response = await fetch('http://localhost:3002/data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newItem),
        });
  
        if (response.ok) {
          setOrderPlaced(true);
          deleteCart();
        } else {
          console.log('Error while adding the new order:');
        }
      } catch (error) {
        console.log('Error while adding the new order:', error);
      }
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddressForm
          addressData={addressData}
          onAddressDataChange={handleAddressDataChange}
        />;
      case 1:
        return <PaymentForm
          paymentData={paymentData}
          onPaymentDataChange={handlePaymentDataChange} />;
      case 2:
        return <Review addressData={addressData} paymentData={paymentData} />;
      default:
        throw new Error('Unknown step');
    }
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #{x}. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}