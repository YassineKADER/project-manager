import { UserAuth } from "../context/AuthContext";

function Mainpage(){
    const {user} = UserAuth();
    return(
        <>
        <p>{JSON.stringify(user)}</p>
        <h1>hello in the home page</h1>
        </>
    )
}

export default Mainpage;