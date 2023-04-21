import { Avatar, Button, TextField, Typography } from "@mui/material";
import "../css/Login.css";
import image from "../../assets/login_logo.png"
import google from "../../assets/google.png"
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { isValidEmail } from "../utilities";
import { MessageModal } from "../items/MessageModal";

function Login() {
  const navigate = useNavigate()
  const {googleSignIn, user,emailPasswordSignIn, checkUsesrExist,logOut} = UserAuth()
  const [loginErrorState, setLoginErrorState] = useState(false)
  const [notValidEmail, setNotValidEmailState] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()
  const handelGoogleSignIn = ()=>{
    try{
      googleSignIn();
    }catch(error){
      console.log(error)
    }
  };
  const handelEmailSignIn = ()=>{
    if(isValidEmail(emailRef.current.value)){
      emailPasswordSignIn(emailRef.current.value, passwordRef.current.value).then((processResult)=>{setLoginErrorState(!processResult); console.log(!processResult)});
    }else{
      setNotValidEmailState(true)
    }
  }

  useEffect(()=>{
    if(user != null){
      navigate("/home")
    }
  },[user])


  return (
    <div className={"container"}>
    <div className="wrapper">
    <img src={image} height={100} width={100}></img>
    <h1>Welcome Back</h1>
      <TextField error={loginErrorState || notValidEmail} label={"Email address"}  fullWidth inputRef={emailRef}></TextField>
      <TextField error={loginErrorState} label={"password"} fullWidth inputRef={passwordRef}></TextField>
      {loginErrorState? <Typography variant="body1" color="error">Email Or Password My be Wrong</Typography>:null}
      <Button variant="contained" color="info" fullWidth size="large" onClick={handelEmailSignIn}>
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
