import { Avatar, Button, TextField } from "@mui/material";
import "./css/Login.css";
import image from "../assets/login_logo.png"
import google from "../assets/google.png"

function Login() {
  return (
    <div className={"container"}>
    <div className="wrapper">
    <img src={image} height={100} width={100}></img>
    <h1>Welcome Back</h1>
      <TextField label={"Email address"} classes={"textField"} fullWidth ></TextField>
      <TextField label={"password"} classes={"textField"} fullWidth></TextField>
      <Button variant="contained" color="success" fullWidth size="large">
        SignIN
      </Button>
      <p>{"Don't have an account? "}<a>Sign up</a></p>
      <Button variant="outlined" color={"inherit"} fullWidth size="large" startIcon={<Avatar src={google}/>}>
        Continue With google
      </Button>
      </div>
    </div>
  );
}

export default Login;
