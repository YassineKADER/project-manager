import { useEffect, useState } from "react";
import { UserAuth} from "../context/AuthContext";
import { Navbar } from "../items/Navbar";
import { MessageModal } from "../items/MessageModal";

function Home() {
    const { logOut, user, checkUsesrExist} = UserAuth();
    const [isModalMessageOpen, setIsModalMessageOpen] = useState(false)
    const [notallowed, setNotAllowed] = useState(false)
  const handelLogoutClick = async () => {
    try {
      console.log(user);
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    if(!isModalMessageOpen){
      checkUsesrExist(user["email"]).then((reuslt)=>{
        if(!reuslt){
          setIsModalMessageOpen(true);
        }
      })
    }
    if(notallowed){
      logOut();
    }
    
  },[isModalMessageOpen, notallowed])
  return (
    <div>
    <MessageModal open={isModalMessageOpen} data={"Please sign up first"} handleClose={()=>{setIsModalMessageOpen(false); setNotAllowed(true)}}></MessageModal>
    <Navbar logout={handelLogoutClick} username={"yassine kader"}></Navbar>
      <h1>home page</h1>
    </div>
  );
}

export default Home;
