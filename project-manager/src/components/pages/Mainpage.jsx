import React from 'react';
import { Typography, Button, Container } from '@mui/material';
import logo from '../../assets/login_logo.png';
import "../css/Mainpage.css"
import { useNavigate } from "react-router-dom";

const Mainpage = () => {
  const navigate = useNavigate()
  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <Container maxWidth="sm" textAlign="center" marginTop={4} style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
        <img
          src={logo}
          alt="Logo"
          style={{
            width: 300,
            height: 300,
            display: 'block',
            animation: 'rotation 3.5s infinite linear', // Apply rotation animation
          }}
        />
        <Button variant="outlined" color="primary" size="large" marginTop={4} onClick={()=>{navigate("/login")}}>
          Get Started
        </Button>
      </Container>
    </div>
  );
};

export default Mainpage;
