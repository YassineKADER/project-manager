import { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { Navbar } from "../items/Navbar";
import { Avatar, Button, Switch, TextField} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "../css/Profeil.css"

export const Profeil = () => {
    const {user,getUser} = UserAuth();
    

    /*useEffect(()=>{
        getUser(user["email"])
    })*/
  return (
        <div className={"root"}>
        <Navbar logout={()=>{console.log("hello")}} username={"yassine kader"}></Navbar>

        <Avatar
        alt={""}
        src={"avatarURL"}
        sx={{ width: 100, height: 100, marginTop:1}}
        onClick={() => {
        document.getElementById("avatarInput").click();
        }}
        />
        <input
        type="file"
        id="avatarInput"
        accept="image/*"
        onChange={()=>{console.log("changed")}}
        style={{ display: "none" }}
        />
        <Button
        variant="contained"
        
        startIcon={<CloudUploadIcon />}
        onClick={() => {
        document.getElementById("avatarInput").click();
        }}
        >
        Change Avatar
        </Button>
        <TextField
        label="First Name"
        variant="outlined"
        className={"input"}
        value={"firstName"}
        onChange={(event) => {console.log(event.target.value)}}
        />
        <TextField
        label="Last Name"
        variant="outlined"
        className={"input"}
        value={"lastName"}
        onChange={(event) => {console.log(event.target.value)}}
        />
        <div >
        <p>Display Project On Your Profeil
        <Switch
        checked={true}
        onChange={(event) => {console.log(event.target.checked)}}
        name="displayProjects"
        /></p>
        </div>
        <Button variant="contained"  onClick={()=>{console.log("hi")}}>
        Save
        </Button>
        </div>
  );
};
