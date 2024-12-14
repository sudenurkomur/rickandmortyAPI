import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#001f3f",
        color: "white",
        textAlign: "center",
        padding: "1rem 0",
        position: "relative", // Sayfa içeriği ne kadar olursa olsun footer her zaman aşağıda olacak
        width: "100%",
        bottom: 0,
      }}
    >
      <p>&copy; 2024 Sude Nur's React Case. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
