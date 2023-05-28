import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Navbar } from "../items/Navbar";
import { Avatar, Button, Switch, TextField, CircularProgress} from "@mui/material";
import CheckCicleIcon from "@mui/icons-material/CheckCircle"
import "../css/Profeil.css"

export const Profeil = () => {
    const {user,getUser, updateUser, uploadPhotoToFirebaseStorage} = UserAuth();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [imageurl, setImageurl] = useState("")
    const [saveState, setSavingState] = useState(false)
    const [displayProjects, setDisplayProjects] = useState(false)

    const handelSaveClick = ()=>{
      setSavingState(!saveState)
      updateUser(user["email"],{
        "displayProjects":displayProjects,
        "firstName":firstName,
        "lastName":lastName,
      }).then(()=>{setSavingState(false)})
    }

    const handelPhotoChanged = (e)=>{
      const file = e.target.files[0];
      uploadPhotoToFirebaseStorage(file).then((url)=>{
        setImageurl(url);
        updateUser(user["email"],{
          "profeilPhoto":url
        })
      });
      
    }

    useEffect(()=>{
        getUser(user["email"]).then((data) =>{
          console.log(data)
          setFirstName(data["firstName"])
          setLastName(data["lastName"])
          setDisplayProjects(data["displayProjects"])
          setImageurl(data["profeilPhoto"])
          console.log(firstName, lastName, displayProjects, imageurl)
        }
        )

    }, [user])
  return (
        <div className={"root"}>
        <Navbar username={firstName+" "+lastName} profeilPicture={imageurl}></Navbar>

        <Avatar
        alt={""}
        src={imageurl}
        sx={{ width: 150, height: 150, marginTop:1}}
        onClick={() => {
        document.getElementById("avatarInput").click();
        }}
        />
        <input
        type="file"
        id="avatarInput"
        accept="image/*"
        onChange={handelPhotoChanged}
        style={{ display: "none" }}
        />
        <TextField
        label="First Name"
        variant="outlined"
        className={"input"}
        value={firstName}
        onChange={(event) => {setFirstName(event.target.value)}}
        />
        <TextField
        label="Last Name"
        variant="outlined"
        className={"input"}
        value={lastName}
        onChange={(event) => {setLastName(event.target.value)}}
        />
        <div style={{display:"none"}}>
        <p>Display Project On Your Profeil
        <Switch
        checked={displayProjects}
        onChange={() => {setDisplayProjects(!displayProjects)}}
        name="displayProjects"
        /></p>
        </div>
        <Button variant="contained" loading onClick={handelSaveClick}>
        Save
        {saveState && <CircularProgress size={24} style={{ color: '#ffffff', strokeWidth: 1, marginLeft:5,}} />}
        
        </Button>
        </div>
  );
};
