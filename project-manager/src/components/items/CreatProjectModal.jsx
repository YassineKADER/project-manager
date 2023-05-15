import { Alert, Button, Card, Modal, Snackbar, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { db } from "../../firebase";
import { UserAuth } from "../context/AuthContext";
import { collection, doc, setDoc } from "firebase/firestore/lite";

export const CreateProjectModal = ({ isopen, isopenSet }) => {
  const { user } = UserAuth();
  const [success, setSuccess] = useState(false);
  const [faileur, setFaileur] = useState(false);
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "2rem",
    rowGap: "10px",
    width: "30%",
  };
  let Projectname = "";
  const createProject = (name) => {
    const docRef = doc(collection(db, "projects"));
    const newProject = {
      leader: [doc(db, "users", user.email)], // reference to a user in the "users" collection
      members: [doc(db, "users", user.email)], // array of references to users in the "users" collection
      name: name,
      progress: 0,
      tasks: {},
    };
    setDoc(docRef, newProject).then((e)=>{
        setSuccess(true);
      }).catch((e)=>{
        setFaileur(true)
      });
  };

  return (
    <div>
      <Modal
        open={isopen}
        onClose={() => {
          isopenSet(false);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        keepMounted
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Card style={style} variant="outlined">
          <Typography>Create a Project</Typography>
          <TextField
            label={"Project Name"}
            fullWidth
            onChange={(e) => {
              Projectname = e.target.value;
            }}
          ></TextField>
          <div
            style={{
              display: "flex",
              alignItems: "left",
              flexDirection: "row-reverse",
              height: "100%",
              width: "100%",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                createProject(Projectname);
              }}
            >
              Create !
            </Button>
          </div>
        </Card>
      </Modal>
      <Snackbar open={success} autoHideDuration={6000} onClose={()=>{setSuccess(false)}}>
        <Alert onClose={()=>{setFaileur(false)}} severity="success" sx={{ width: "100%" }}>
          Project Created Successfully !
        </Alert>
      </Snackbar>
      <Snackbar open={faileur} autoHideDuration={6000} onClose={()=>{setFaileur(false)}}>
        <Alert onClose={()=>{setFaileur(false)}} severity="error" sx={{ width: "100%" }}>
          Error Please Contact The support
        </Alert>
      </Snackbar>
    </div>
  );
};
