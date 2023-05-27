import { arrayUnion, collection, getDocs, doc, updateDoc, getDoc} from "firebase/firestore/lite";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { Autocomplete, Button, Card, Modal, Snackbar, TextField, Alert} from "@mui/material";

export const AddUser = ({open, openSet, projectId}) => {
  const [users, setUsers] = useState([]);
  const [usersToAdd, setUsersToAdd] = useState([])
  const [snackBar, setSnackBar] = useState(false)
  useEffect(() => {
    try {
      getDocs(collection(db, "users")).then((queryJob) => {
        const emails = queryJob.docs.map((doc) => {
          return doc.id;
        });
        // const emails = queryJob.docs.map((doc)=>{doc.id})
        setUsers(emails);
      });
    } catch (e) {
      console.log("error");
    }
  }, []);
  const filterOptions = (options, state) => {
    if (state.inputValue.trim() === "") {
      return [];
    }
    return options;
  };
  const getOptionDisabled = (option, { inputValue }) => {
    return inputValue.trim() === "";
  };

  const handleInputChange = (event, newInputValue) => {
    setUsersToAdd(newInputValue)
  };

  const handelAddUserClick = ()=>{
    getDoc(doc(db, 'projects', projectId))
  .then((snapshot) => {
    const usersRefs = snapshot.get('members');
    const newUsersRefs = usersToAdd.map((email) => doc(db, 'users', email));
    console.log(usersRefs);
    console.log(newUsersRefs);

    const flattenedRefs = [...usersRefs, ...newUsersRefs];

    const updatedReferences = arrayUnion(...flattenedRefs);

    return updateDoc(doc(db, 'projects', projectId), { members: updatedReferences });
  })
  .then(() => {
    openSet(false)
    setSnackBar(true)
  })
  .catch(() => {
    console.log('not cool');
  });

  }
  return (
    <>
    <Modal
      open={open}
      onClose={()=>openSet(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      keepMounted
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Card
        style={{
          minWidth: "50%",
          minHeight: "30%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection:"column"
        }}
      >
        <Autocomplete
          multiple
          disablePortal
          id="combo-box-demo"
          options={users}
          style={{minWidth:"500px"}}
          filterOptions={filterOptions}
          onChange={handleInputChange}
          renderInput={(params) => <TextField {...params} label="User Email" />}
        />
        <div style={{marginTop:"20px",width:"70%", display:"flex", alignItems:"right", justifyContent:"right"}}><Button variant="outlined" onClick={()=>{handelAddUserClick()}}>Add Users</Button></div>
      </Card>
    </Modal>
    
    <Snackbar open={snackBar} autoHideDuration={1500} onClose={()=>{setSnackBar(false)}}>
    <Alert severity="success" sx={{ width: '100%' }}>
      Users Added !
    </Alert>
  </Snackbar>
  
    </>
  );
};
