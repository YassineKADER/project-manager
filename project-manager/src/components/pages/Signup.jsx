import { Avatar, Button, TextField } from "@mui/material";
import "../css/Signup.css";
import image from "../../assets/login_logo.png"
import google from "../../assets/google.png"
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Signup() {
  const {googleSignIn, addUserData, checkUsesrExist} = UserAuth();
  const navigate = useNavigate();
    function checkPassword(event){
        console.log(event.target.value) 
    }
    function testme(event){
        console.log(event.target.value)
    }
    function handelGoogleSignup(){
      googleSignIn().then((user)=>{
        checkUsesrExist(user["email"]).then((result)=>{
          if(!result){
            addUserData(user["email"],"","",user["photoURL"],true);
            
          }
        })
      })
    }
  return (
    <div className={"container"}>
    <div className="wrapper">
    <img src={image} height={100} width={100}></img>
    <h1>Welcome Back</h1>
      <TextField label={"Email address"} classes={"textField"} fullWidth></TextField>
      <TextField label={"Password"} classes={"textField"} fullWidth onChange={testme}></TextField>
      <TextField label={"Confirme Password"} classes={"textField"} fullWidth onChange={checkPassword}></TextField>
      <Button variant="contained" color="info" fullWidth size="large">
        Sign UP
      </Button>
      <p>{"Already have an account? "}<a href={"/login"}>Log IN</a></p>
      <Button onClick={handelGoogleSignup} variant="outlined" color={"info"} fullWidth size="large" startIcon={<Avatar src={google}/>}>
        Continue With google
      </Button>
      </div>
    </div>
  );
}

export default Signup;
