import { useEffect, useState } from "react";
import { UserAuth} from "../context/AuthContext";
import { Navbar } from "../items/Navbar";
import { MessageModal } from "../items/MessageModal";
import { Button, Card, Container, Grid, Modal, TextField } from "@mui/material";
import { ProjectCard } from "../items/ProjectCard";
import "./../css/Home.css"
import { CreateProjectModal } from "../items/CreatProjectModal";
import { Projects } from "../items/Projects";

function Home() {
    const { logOut, user, checkUsesrExist, getUser, getProjects} = UserAuth();
    const [isModalMessageOpen, setIsModalMessageOpen] = useState(false)
    const [notallowed, setNotAllowed] = useState(false)
    const [username, setUserName] = useState("")
    const [isopen, isopenSet] = useState(false)
    const [projects, setProjects] = useState(null)
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
    if (!projects || projects.length === 0 || !isopen) {
      const userProjects = getProjects(user.email).then((data)=>{setProjects(data); console.log(data)});
    }
  },[isModalMessageOpen, notallowed, user.email, isopen])
  return (
    <div>
    <Navbar username={username} profeilPicture={profeilPicture}></Navbar>
    <Container>
    <MessageModal open={isModalMessageOpen} data={"Please sign up first"} handleClose={()=>{setIsModalMessageOpen(false); setNotAllowed(true)}}></MessageModal>
    <h1 style={{textAlign:"left"}}>Projects:</h1>
      <Grid container spacing={3}>
      <Projects projects={projects}></Projects>
      <Grid item xs={6} md={3}><Card onClick={()=>{isopenSet(true)}}variant={"outlined"} id={"addProject"} style={{height:"125px", width:"100%", border:"1px rgba(0, 0, 0, 0.12) dashed",display:"flex",alignItems:"center", justifyContent:"center"}}>+</Card></Grid>
      </Grid>
      </Container>
      <CreateProjectModal isopen={isopen} isopenSet={isopenSet}></CreateProjectModal>
    </div>
  );
}

export default Home;
