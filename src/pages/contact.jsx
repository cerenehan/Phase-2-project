import React from "react";
import "./contact.css";
import { Paper } from '@mui/material';

export const Contact = ({ theme }) => {
  return (
    <Paper className={`contact-page ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>We are here to assist you with any questions or concerns you may have. Please don't hesitate to reach out to us using the following contact methods:</p>

      <div className="contact-info">
        <div className="contact-item">
          <a href="https://www.instagram.com/your_instagram_username" target="_blank" rel="noopener noreferrer">
            <img src="https://i0.wp.com/motion-lab-sudio.com/wp-content/uploads/2020/04/35-355558_vi-logo-instagram-format-png.jpg?resize=150%2C150&ssl=1" alt="Instagram" />
          </a>
          <p>Follow us on Instagram for the latest updates and promotions.</p>
        </div>

        <div className="contact-item">
          <a href="https://www.facebook.com/your_facebook_page" target="_blank" rel="noopener noreferrer">
            <img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/128/social-facebook-icon.png" width="128" height="128" alt="Facebook" />
          </a>
          <p>Connect with us on Facebook to stay in the loop.</p>
        </div>

      <div className="contact-item">
        <a href="mailto:Virtualtreasures@VT.com">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs58YGw8yNQraiPID31EEx2P0Xh-lsDijf0gk4BwfcQ5Y4z6gHGVkezrYi8x6nDWb83uA&usqp=CAU" width="128" height="128" alt="Email" />
        </a>
        <p>Email us anytime for assistance or inquiries.</p>
      </div>

        <div className="contact-item">
          <i className="fa fa-phone"></i>
          <p>Call or text us:</p>
          <p>Phone: +248-434-5508</p>
          <p>Our customer support is available during business hours.</p>
        </div>
      </div>
      <p>We value your feedback and are committed to providing excellent customer service. Thank you for shopping with us!</p>
    </div>
    </Paper>
  );
};