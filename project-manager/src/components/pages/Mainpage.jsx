import { UserAuth} from "../context/AuthContext";

function Mainpage(){
    const {user, addUserData, emailPasswordSignIn} = UserAuth();
    return(
        <>
        <p>{JSON.stringify(user)}</p>
        <h1>hello in the home page</h1>
        <button onClick={()=>{emailPasswordSignIn("yassine.kader@gmail.com", "adminadm").then((result)=>{console.log(result)})}}>{"click"}</button>
        </>
    )
}

export default Mainpage;