import {
  Alert,
  Autocomplete,
  Button,
  Card,
  Checkbox,
  FormLabel,
  Input,
  InputLabel,
  Modal,
  Snackbar,
  TextField,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useEffect, useState } from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const AddTask = ({
  open,
  setOpen,
  tasks,
  setTasks,
  addTaskToDB,
  members,
}) => {
  const tasksNames = [...new Set(tasks.map((item) => item[1]))].filter(
    (value) => typeof value === "string"
  );
  const users = members.map((item) => {
    return { id: item.id, label: item.ref.firstName + " " + item.ref.lastName };
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [name, setName] = useState(null);
  const [user, setUser] = useState(null);
  const [dependencies, setdependencies] = useState(null);
  const [nameerror, setNameError] = useState(false);

  const [dateError, setDateError] = useState(false);
  let dateErr=false
  let userErr = false
  let nameErr = false
  const [userError, setUserError] = useState(false);

  const [taskAdded, setTaskAdded] = useState(false);
  useEffect(()=>{
    setdependencies(null)
  },[open])
  return (
    <div>
      <Modal
        open={open}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        onClose={() => setOpen(false)}
      >
        <Card
          style={{
            minWidth: "50%",
            minHeight: "35%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div
            style={{ display: "flex", justifyContent: "left", width: "90%" }}
          >
            <h1>Add Task</h1>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <TextField
              label={"Task Name"}
              error={nameerror}
              required
              onChange={(e) => {
                setName(e.target.value);
                if(tasksNames.includes(e.target.value)) {
                  setNameError(true);
                }
                else{
                  setNameError(false)
                }
              }}
            ></TextField>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <InputLabel>Start Date:</InputLabel>
              <Input type="date" required onChange={(e)=>setStartDate(e.target.value)} error={dateError}></Input>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <InputLabel>End Date</InputLabel>
              <Input type="date" required onChange={(e)=>setEndDate(e.target.value)} error={dateError}></Input>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={tasksNames}
              disableCloseOnSelect
              getOptionLabel={(option) => option}
              onChange={(e,v)=>setdependencies(v)}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </li>
              )}
              style={{ minWidth: 325 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Dependencies"
                  placeholder="Favorites"
                />
              )}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={users}
              sx={{ minWidth: 325 }}
              onChange={(e,v)=>setUser(v.id)}
              renderInput={(params) => <TextField {...params} label="User" error={userError}/>}
            />
          </div>
          <div></div>
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              width: "90%",
              marginBottom: "5px",
            }}
          >
            <Button variant="outlined" onClick={()=>{
              const dstart  = new Date(startDate)
              const dend = new Date(endDate)
              if(!user){
                setUserError(true)
                userErr = true
              }
              else{
                setUserError(false)
                userErr = false
              }
              if(!startDate || !endDate){
                setDateError(true)
                dateErr = true
              }
              else{
                setDateError(false)
                dateErr = false
              }
              if(dstart>=dend){
                setDateError(true)
                dateErr = true
              }
              else{
                setDateError(false)
                dateErr = false
              }
              if(!name){
                setNameError(true)
                nameErr = true
              }
              else{
                setNameError(false)
                nameErr = false
              }
              console.log(dateError, userError, nameerror)
              if(!dateErr && !userErr && !nameErr){
                const dep = (dependencies==null)? []: dependencies
                const task = [name, name, user, dstart, dend, null, 0, dep.join(',')]
                const taskObject = {name:name,taskId:name,duration:null,progress:0,endDate:dend, startDate:dstart, email:user,dependencies:dep.join(',')}
                console.log(task)
                setTasks((prevTasks) => [
                  ...prevTasks,
                  task,
                ]);
                addTaskToDB(taskObject)
                setTaskAdded(true)
                setOpen(false)
              }
              
              console.log(tasks)
            }}>Add Task</Button>
          </div>
        </Card>
      </Modal>
      <Snackbar open={taskAdded} autoHideDuration={1500} onClose={() => {setTaskAdded(false)}}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Task Added !
        </Alert>
      </Snackbar>
      <Snackbar open={dateError || userError || nameerror} autoHideDuration={1500} onClose={() => {}}>
        <Alert severity="error" sx={{ width: "100%" }}>
          Please Check And Correct The Data That You Entered
        </Alert>
      </Snackbar>
    </div>
  );
};
