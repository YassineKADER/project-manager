import { Avatar, Button, TextField } from "@mui/material";
import "../css/Login.css";
import image from "../../assets/login_logo.png"
import google from "../../assets/google.png"
import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function Login() {
  const {googleSignIn} = UserAuth()
  const handelGoogleSignIn = async()=>{
    try{
      await googleSignIn();
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className={"container"}>
    <div className="wrapper">
    <img src={image} height={100} width={100}></img>
    <h1>Welcome Back</h1>
      <TextField label={"Email address"} classes={"textField"} fullWidth ></TextField>
      <TextField label={"password"} classes={"textField"} fullWidth></TextField>
      <Button variant="contained" color="info" fullWidth size="large">
        Sign IN
      </Button>
      <p>{"Don't have an account? "}<a href={"/signup"}>Sign up</a></p>
      <Button onClick={handelGoogleSignIn} variant="outlined" color={"info"} fullWidth size="large" startIcon={<Avatar src={google}/>}>
        Continue With google
      </Button>
      </div>
    </div>
  );
}

export default Login;
