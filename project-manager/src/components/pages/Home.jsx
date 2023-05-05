import { useEffect, useState } from "react";
import { UserAuth} from "../context/AuthContext";
import { Navbar } from "../items/Navbar";
import { MessageModal } from "../items/MessageModal";
import { Container, Grid } from "@mui/material";
import { ProjectCard } from "../items/ProjectCard";

function Home() {
    const { logOut, user, checkUsesrExist, getUser} = UserAuth();
    const [isModalMessageOpen, setIsModalMessageOpen] = useState(false)
    const [notallowed, setNotAllowed] = useState(false)
    const [username, setUserName] = useState("")
    const [profeilPicture, setProfeilPicture] = useState("")
  const handelLogoutClick = async () => {
    try {
      console.log(user);
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isModalMessageOpen) {
      checkUsesrExist(user.email).then((result) => {
        if (!result) {
          setIsModalMessageOpen(true);
        } else {
          getUser(user.email).then((data) => {
            setUserName(data.firstName + " " + data.lastName);
            setProfeilPicture(data.profeilPhoto);
          });
        }
      });
    }
    if (notallowed) {
      logOut();
    }
  },[isModalMessageOpen, notallowed])
  return (
    <div>
    <Navbar username={username} profeilPicture={profeilPicture}></Navbar>
    <Container>
    <MessageModal open={isModalMessageOpen} data={"Please sign up first"} handleClose={()=>{setIsModalMessageOpen(false); setNotAllowed(true)}}></MessageModal>
    <h1 style={{textAlign:"left"}}>Projects:</h1>
      <Grid container spacing={3}>
      <Grid item xs={6} md={3}><ProjectCard progress={78} username={"yassine kader"} projectName={"Project 1"} profeilPicture={profeilPicture}></ProjectCard></Grid>
      <Grid item xs={6} md={3}><ProjectCard></ProjectCard></Grid>
      <Grid item xs={6} md={3}><ProjectCard></ProjectCard></Grid>
      <Grid item xs={6} md={3}><ProjectCard></ProjectCard></Grid>
      <Grid item xs={6} md={3}><ProjectCard></ProjectCard></Grid>
      <Grid item xs={6} md={3}><ProjectCard></ProjectCard></Grid>
      </Grid>
      </Container>
    </div>
  );
}

export default Home;
