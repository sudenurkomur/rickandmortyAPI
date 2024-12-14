import React from "react";

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: "#001f3f", 
      color: "white", 
      textAlign: "center", 
      padding: "1rem 0", 
      position: "fixed", 
      bottom: 0, 
      width: "100%" 
    }}>
      <p>&copy; 2024 My React App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
