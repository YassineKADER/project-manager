import React from "react";
import { Avatar, Modal, Typography } from "@mui/material";
import image from "../../assets/login_logo.png"
export const MessageModal = ({ open, handleClose, data }) => {
    return (
      <Modal open={open} onClose={handleClose}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "#fff", padding: "20px", minWidth: "300px", borderRadius:"15px",textAlign:"center",display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
          <Avatar src={image}></Avatar>
          <Typography variant="h6">{data}</Typography>
        </div>
      </Modal>
    );
  };