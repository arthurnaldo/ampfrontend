import React from "react";
import "./ContactPage.css"; // Assuming you have a CSS file for styles

const ContactPage = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-description">
        We would love to hear from you! If you have any questions, feel free to
        reach out to us at:
      </p>
      <p className="contact-email">
        Email:{" "}
        <a href="mailto:berkeleyamp@berkeley.edu">berkeleyamp@berkeley.edu</a>
      </p>
    </div>
  );
};

export default ContactPage;
