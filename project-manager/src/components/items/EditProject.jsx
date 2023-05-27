import { Alert, Button, Card, Modal, Snackbar, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { db } from "../../firebase";
import { UserAuth } from "../context/AuthContext";
import { collection, doc, updateDoc } from "firebase/firestore/lite";

export const EditProject = ({ isopen, isopenSet , uid}) => {
//   let Projectname = ""
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "2rem",
    rowGap: "10px",
    width: "30%",
  };
  const [success, setSuccess] = useState(false);
  const [faileur, setFaileur] = useState(false);
  const [projectName, setProjectName] = useState("");
  const updateProjectName = (project)=>{
    if(project!="" && project!=null){
        const docref = doc(db, "projects", uid)
        updateDoc(docref, {name:project}).then(()=>{window.location.reload();})
        isopenSet(false)
    }
  }
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
          <Typography>Edit Project Name</Typography>
          <TextField
            label={"Project Name"}
            fullWidth
            onChange={(e) => {
              setProjectName(e.target.value);
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
                updateProjectName(projectName);
                console.log(projectName)
              }}
            >
              Change !
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
