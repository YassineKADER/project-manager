import { useEffect, useRef, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Navbar } from "../items/Navbar";
import { Chart } from "react-google-charts";
import {
  Container,
  Grid,
  Avatar,
  Chip,
  Card,
  Typography,
  Snackbar,
  Alert,
  Button,
  Divider,
  Checkbox,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  getDoc,
  doc,
  getDocs,
  arrayRemove,
  updateDoc,
} from "firebase/firestore/lite";
import { db } from "../../firebase";
import DeleteIcon from "@mui/icons-material/Add";
import { AddUser } from "../items/AddUser";
import { AddTask } from "../items/AddTask";
import Chat from "../items/Chat";

export const Project = () => {
  const { uid } = useParams();
  const { user, getUser } = UserAuth();
  const [members, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [addUser, setAddUser] = useState(false);
  const [deleteSnackBar, setDeleteSnackBar] = useState(false);
  const [isUserLeader, setIsUserLeader] = useState(false)
  const addTaskToDB = (Task)=>{
    const project = doc(db, "projects", uid);
    getDoc(project).then((snapshot)=>{
      let taskArray = (snapshot.data()['tasks']!=[]) ? snapshot.data()['tasks'] : []
      console.log(taskArray)
      const updatedArray = [...taskArray, Task]
      return updateDoc(project, {tasks: updatedArray });
    })
    .then(() => {
      console.log('Task added to the document successfully.');
    })
    .catch((error) => {
      console.error('Error updating document:', error);
    });
};
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("hello world");
        console.log(user);
        const docRef = doc(db, "projects", uid);
        const docSnapshot = await getDoc(docRef);
        const data = docSnapshot.data();

        let leaderRefs = data["leader"];
        let memberRefs = data["members"];

        // Fetch leader documents concurrently
        const leaderPromises = leaderRefs.map((ref) => getDoc(ref));
        const leaderSnapshots = await Promise.all(leaderPromises);
        const leaders = leaderSnapshots.map((snapshot) => snapshot.id);

        // Fetch member documents concurrently
        const memberPromises = memberRefs.map((ref) => getDoc(ref));
        const memberSnapshots = await Promise.all(memberPromises);
        const members_arr = memberSnapshots.map((snapshot) => ({
          ref: snapshot.data(),
          id: snapshot.id,
          is_leader: leaders.includes(snapshot.id),
        }));
        members_arr.forEach((item)=>{
          if(item.id == user.email && item.is_leader==true){
            setIsUserLeader(true)
          }
        })
        setUsers(members_arr);
        console.log(members_arr);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [addUser]);
  const data = [
    [
      { type: "string", label: "Task ID" },
      { type: "string", label: "Task Name" },
      { type:"string", label:"Email" },
      { type: "date", label: "Start Date" },
      { type: "date", label: "End Date" },
      { type: "number", label: "Duration" },
      { type: "number", label: "Percent Complete" },
      { type: "string", label: "Dependencies" },
    ],
    [
      "Task 1",
      "Design",
      "yassinekader6.contact@gmail.com",
      new Date(2022, 1, 1),
      new Date(2022, 1, 5),
      null,
      50,
      null,
    ],
    [
      "Task 2",
      "Development",
      "yassinekader8.contact@gmail.com",
      new Date(2022, 1, 6),
      new Date(2022, 1, 20),
      null,
      25,
      "Task 1",
    ],
    [
      "Task 3",
      "Testing",
      "yassinekader.contact@gmail.com",
      new Date(2022, 1, 21),
      new Date(2022, 2, 1),
      null,
      0,
      "Task 2, Task 1",
    ],
    [
      "Task 3",
      "Testing",
      "yassine.contact@gmail.com",
      new Date(2022, 1, 21),
      new Date(2022, 2, 1),
      null,
      0,
      "Task 2, Task 1",
    ],
    [
      "Task 4",
      "hi",
      "yassineker.contact@gmail.com",
      new Date(2022, 1, 21),
      new Date(2022, 2, 1),
      null,
      0,
      "Task 2, Task 1",
    ],
    [
      "Task 5",
      "Testing",
      "yassinekadercontact@gmail.com",
      new Date(2022, 1, 21),
      new Date(2022, 2, 1),
      null,
      0,
      "Task 2, Task 1",
    ],
    [
      "Task 6",
      "Testing j",
      "yassinekader.contact@gmail.com",
      new Date(2022, 1, 21),
      new Date(2022, 2, 31),
      null,
      0,
      "Task 2, Task 1",
    ]
  ];
  function handleChartSelect(selection) {
    // Handle chart selection events
    console.log(selection);
  }

  function handelMemberDelete(data) {
    const documentRef = doc(db, "projects", uid);
    console.log(data);
    const userToDelete = doc(db, "users", data);
    const updateObject = {
      members: arrayRemove(userToDelete),
    };
    updateDoc(documentRef, updateObject).then(() => {
      console.log("user deleted");
    });
    setUsers(members.filter((item) => item.id !== data));
    setDeleteSnackBar(true);
  }

  const handleAddUserClose = () => {
    setAddUser(false);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Navbar
        username={"yassine" + " " + "lastName"}
        profeilPicture={user.profeilPicture}
      ></Navbar>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Card
          variant={"outlined"}
          style={{
            display: "flex",
            flexDirection: "row",
            rowGap: "10",
            gap: "5",
            alignItems: "center",
            width: "90%",
            padding: "5px",
            marginTop: "10px",
          }}
        >
          {
            <Typography variant="body2" style={{ marginRight: "5px" }}>
              Members:{" "}
            </Typography>
          }
          {members.map((mem, index) => (
            <Chip
              key={mem.id}
              label={mem.ref.firstName + " " + mem.ref.lastName}
              avatar={<Avatar src={mem.ref.profeilPhoto}></Avatar>}
              onDelete={
                mem.is_leader == true
                  ? undefined
                  : (data) => handelMemberDelete((data = mem.id))
              }
            ></Chip>
          ))}
          {isUserLeader && <Chip
            label={"Add"}
            deleteIcon={<DeleteIcon></DeleteIcon>}
            onClick={() => {
              console.log("im clicked");
              setAddUser(true);
            }}
            onDelete={() => {
              setAddUser(true);
              console.log("hi");
            }}
          ></Chip>}
        </Card>

        <div style={{ width: "90%", marginTop: "2rem", height: "100%" }}>
          <Grid container style={{ height: "100%" }}>
            <Grid item xs={8} style={{ height: (10*data.length).toString()+"vh"}}>
              {isUserLeader && <Card
                variant={"outlined"}
                style={{
                  height: "50px",
                  marginBottom: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body2" style={{ marginLeft: "5px" }}>
                  Gantt Chart:{" "}
                </Typography>
                <div
                  style={{ marginRight: "5px", display: "flex", gap: "5px" }}
                >
                  <Button variant="outlined">Delete</Button>
                  <Button variant="outlined">Edit</Button>
                  <Button variant="outlined" onClick={()=>{addTaskToDB({name:"HI",nik:"Hello",test:null})}}>Add</Button>
                </div>
              </Card>}
              <Chart
                chartType="Gantt"
                data={data}
                width="100%"
                height="100%"
                options={{
                  gantt: {
                    trackHeight: 50,
                  },
                }}
              />
            </Grid>
            <Grid item xs={4} style={{ height: "100%", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
              <h2>Your Tasks:</h2>
              <Card variant="outlined" style={{width:"80%", padding:"0.5rem"}}><div style={{display:"flex", alignItems:"center"}}><Checkbox></Checkbox><Typography>Deploy on aws</Typography></div></Card>
              <Card variant="outlined" style={{width:"80%", padding:"0.5rem"}}><div style={{display:"flex", alignItems:"center"}}><Checkbox></Checkbox><Typography>Deploy</Typography></div></Card>
              <Card variant="outlined" style={{width:"80%", padding:"0.5rem"}}><div style={{display:"flex", alignItems:"center"}}><Checkbox></Checkbox><Typography>Deploy aws</Typography></div></Card>
              <Card variant="outlined" style={{width:"80%", padding:"0.5rem"}}><div style={{display:"flex", alignItems:"center"}}><Checkbox></Checkbox><Typography>Deploy Mobile App</Typography></div></Card>
              <Card variant="outlined" style={{width:"80%", padding:"0.5rem"}}><div style={{display:"flex", alignItems:"center"}}><Checkbox></Checkbox><Typography>Deploy Files</Typography></div></Card>
            </Grid>
          </Grid>
        </div>
      </div>
      <AddUser open={addUser} openSet={setAddUser} projectId={uid}></AddUser>
      {uid}
      <Snackbar
        open={deleteSnackBar}
        autoHideDuration={1500}
        onClose={() => {
          setDeleteSnackBar(false);
        }}
      >
        <Alert severity="info" sx={{ width: "100%" }}>
          User Deleted !
        </Alert>
      </Snackbar>
      <AddTask></AddTask>
      <Chat></Chat>
    </div>
  );
};
