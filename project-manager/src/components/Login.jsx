import { Button, TextField } from "@mui/material";
import "./css/Login.css";
import image from "../assets/login_logo.png"

function Login() {
  return (
    <div className={"container"}>
    <div className="wrapper">
    <img src={image} height={250} width={250}></img>
      <TextField label={"email"} classes={"textField"} fullWidth ></TextField>
      <TextField label={"password"} classes={"textField"} fullWidth></TextField>
      <Button variant="contained" color="success" fullWidth>
        SignIN
      </Button>
      </div>
    </div>
  );
}

export default Login;
