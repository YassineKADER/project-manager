import { useEffect, useRef, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Navbar } from "../items/Navbar";
import { Chart } from "react-google-charts";
import { format } from "date-fns";
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
  const [isUserLeader, setIsUserLeader] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    [
      { type: "string", label: "Task ID" },
      { type: "string", label: "Task Name" },
      { type: "string", label: "Email" },
      { type: "date", label: "Start Date" },
      { type: "date", label: "End Date" },
      { type: "number", label: "Duration" },
      { type: "number", label: "Percent Complete" },
      { type: "string", label: "Dependencies" },
    ],
  ]);
  const [selectedtask, setSelectedTask] = useState(null);
  const [tasksAdded, setTaskAdded] = useState(false);
  const handleTaskClick = (event) => {
    // Add 1 to the row index to skip the header row
    const selection = event.chartWrapper.getChart().getSelection();
    if (selection && selection.length > 0 && selection[0].row !== undefined) {
      console.log("Clicked Task:", selection[0].row);
      setSelectedTask(selection[0].row + 1);
      // Perform further actions with the selected task
    }

    // Perform further actions with the selected task
  };
  const addTaskToDB = (Task) => {
    const project = doc(db, "projects", uid);
    getDoc(project)
      .then((snapshot) => {
        let taskArray =
          snapshot.data()["tasks"] != [] ? snapshot.data()["tasks"] : [];
        console.log(taskArray);
        const updatedArray = [...taskArray, Task];
        return updateDoc(project, { tasks: updatedArray });
      })
      .then(() => {
        console.log("Task added to the document successfully.");
      })
      .catch((error) => {
        console.error("Error updating document:", error);
      });
  };
  let isloaded = false;
  let count = 1;
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("hello world");
        console.log(user);
        const docRef = doc(db, "projects", uid);
        const docSnapshot = await getDoc(docRef);
        const data = docSnapshot.data();
        console.log(data.tasks);

        if (typeof data.tasks === "object") {
          const tasksToAdd = data.tasks.filter((item) => {
            // Check if the task already exists in the tasks array
            const taskId = item.taskId;
            const existingTask = tasks.find((task) => task[0] === taskId);
            return !existingTask;
          });

          console.log("tasksToAdd", tasksToAdd);

          setTasks((prevTasks) => [
            ...prevTasks,
            ...tasksToAdd.map((item) => [
              item.taskId,
              item.name,
              item.email,
              new Date(
                item.startDate.toDate().getFullYear(),
                item.startDate.toDate().getMonth(),
                item.startDate.toDate().getDate()
              ), // Convert to ISO 8601 format
              new Date(
                item.endDate.toDate().getFullYear(),
                item.endDate.toDate().getMonth(),
                item.endDate.toDate().getDate()
              ),
              item.duration,
              0,
              item.dependencies,
            ]),
          ]);
        }

        console.log("tasks:", tasks);
        isloaded = true;

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

        console.log("members", members_arr);

        members_arr.forEach((item) => {
          if (item.id === user.email && item.is_leader === true) {
            setIsUserLeader(true);
          }
        });

        setUsers(members_arr);

        console.log(members_arr);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    if (!isloaded) {
      fetchData();
      isloaded = true;
      console.log("count: ", count);
      count += 1;
    }
  }, [addUser, addTask]);

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
        profeilPicture={""}
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
                mem.is_leader == true || !isUserLeader
                  ? undefined
                  : (data) => handelMemberDelete((data = mem.id))
              }
            ></Chip>
          ))}
          {isUserLeader && (
            <Chip
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
            ></Chip>
          )}
        </Card>

        <div style={{ width: "90%", marginTop: "2rem", height: "100%" }}>
          <Grid container style={{ height: "100%" }}>
            <Grid
              item
              xs={8}
              style={{ height: (10 * tasks.length).toString() + "vh" }}
            >
              {isUserLeader && (
                <Card
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
                    <Button
                      variant="outlined"
                      onClick={async () => {
                        const newArray = [...tasks];
                        newArray.splice(selectedtask, 1);
                        setTasks(newArray);
                        const docRef = doc(db, "projects", uid);
                        const docSnapshot = await getDoc(docRef);
                        
                        if (docSnapshot.exists()) {
                          const tasksArray = docSnapshot.data().tasks;
                          tasksArray.splice(selectedtask-1,1);
                          await updateDoc(docRef, { tasks: tasksArray });
                        }
                      }}
                    >
                      Delete
                    </Button>
                    <Button variant="outlined">Edit</Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setAddTask(true);
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </Card>
              )}
              <Chart
                chartType="Gantt"
                data={tasks}
                width="100%"
                height="100%"
                options={{
                  gantt: {
                    trackHeight: 50,
                    clickable: true,
                    labelMaxWidth: 200,
                    labelWrap: true,
                  },
                }}
                chartEvents={[
                  {
                    eventName: "select",
                    callback: handleTaskClick,
                  },
                ]}
              />
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <h2>Your Tasks:</h2>
              {tasks.map((item) => {
                if (typeof item[0] == "string" && item[2] == user.email)
                  return (
                    <Card
                      variant="outlined"
                      style={{ width: "80%", padding: "0.5rem" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Checkbox></Checkbox>
                        <Typography>{item[0]}</Typography>
                      </div>
                    </Card>
                  );
              })}
            </Grid>
          </Grid>
        </div>
      </div>
      <AddUser open={addUser} openSet={setAddUser} projectId={uid}></AddUser>
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
      <AddTask
        open={addTask}
        setOpen={setAddTask}
        tasks={tasks}
        setTasks={setTasks}
        addTaskToDB={addTaskToDB}
        members={members}
      ></AddTask>
    </div>
  );
};
