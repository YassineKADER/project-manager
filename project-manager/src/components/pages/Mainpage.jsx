import { useNavigate} from "react-router-dom";
import { UserAuth} from "../context/AuthContext";

function Mainpage(){
    const {user, addUserData, emailPasswordSignIn} = UserAuth();
    const navigate = useNavigate();
    const handelLoginClick = ()=>{
        navigate("/login")
    }

    const handelSignUpClick = ()=>{
        navigate("/signup")
    }
    return(
        <>
        <p>{JSON.stringify(user)}</p>
        <h1>hello in the home page</h1>
        <button onClick={()=>{emailPasswordSignIn("yassine.kader@gmail.com", "adminadm").then((result)=>{console.log(result)})}}>{"click"}</button>
        <button onClick={handelLoginClick}>login</button>
        <button onClick={handelSignUpClick}>signup</button>
        </>
    )
}

export default Mainpage;