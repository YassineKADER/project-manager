import { Alert, Button, Card, Modal, Snackbar, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { db } from "../../firebase";
import { UserAuth } from "../context/AuthContext";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore/lite";

export const RemoveProject = ({ isopen, isopenSet , uid, project}) => {
const removeProject = (uid)=>{
    const docRef = doc(db, "projects", uid)
    deleteDoc(docRef).then(()=>{window.location.reload();})
    isopenSet(false)
    //
}
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
          <Typography variant="h6">{'Do You Really Want To Delete "' + project+ '" project ?'}</Typography>
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
                removeProject(uid)
              }}
            >
              Delete !
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
