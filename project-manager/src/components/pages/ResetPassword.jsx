import { UserAuth } from "../context/AuthContext";
import image from "../../assets/login_logo.png";
import { TextField, Button } from "@mui/material";
import { useRef, useState } from "react";
import { isValidEmail } from "../utilities";

export function ResetPassword() {

  const {auth,sendResetEmail} = UserAuth();
  const inputEmailAdress = useRef(null);
  const resetEmailField = useRef(null);
  const [operationstate, setOperationState] = useState(true)

  const handelResetClick = async ()=>{
    try{
      if(isValidEmail(inputEmailAdress.current.value)){
        setOperationState(true)
        await sendResetEmail(inputEmailAdress.current.value)
      }
      else{
        setOperationState(false)
      }
      
    }catch(error){
      console.log("mamamiya")
      console.log(error);
      setOperationState(false);
    }
    
  }

  return(
  <div className={"container"}>
    <div className="wrapper">
    <img src={image} height={100} width={100}></img>
    <h1>Welcome Back</h1>
      <TextField error={!operationstate} inputRef={inputEmailAdress} ref={resetEmailField} id={"resetemail"} label={"Email address"} classes={"textField"} type="email" fullWidth></TextField>
      <Button variant="contained" color="info" fullWidth size="large" onClick={handelResetClick}>
        Send Reset Email
      </Button>
      <p>{"Don't have an account? "}<a href={"/signup"}>Sign up</a></p>
      </div>
    </div>
    );
}
