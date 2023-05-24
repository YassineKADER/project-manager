import {
  Autocomplete,
  Button,
  Card,
  Checkbox,
  FormLabel,
  Input,
  InputLabel,
  Modal,
  TextField,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const AddTask = ({open, setOpen, tasks, setTasks, addTaskToDB, members}) => {
  return (
    <Modal
      open={open}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
      onClose={()=>setOpen(false)}
    >
      <Card
        style={{
          minWidth: "50%",
          minHeight: "35%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap:"10px"
        }}
      >
      <div style={{display:"flex", justifyContent:"left", width:"90%"}}><h1>Add Task</h1></div>
      
      <div style={{display:"flex", gap:"10px"}}>
        <TextField label={"Task Name"} required></TextField>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <InputLabel>Start Date:</InputLabel>
          <Input type="date" required></Input>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <InputLabel>End Date</InputLabel>
          <Input type="date" required></Input>
        </div>
        </div>
        <div style={{display:"flex", gap:"10px"}}>
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={["hi", "hello", "halaloa"]}
          disableCloseOnSelect
          getOptionLabel={(option) => option}
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
          style={{ minWidth: 300 }}
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
          options={["hello"]}
          sx={{ minWidth: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
        </div>
        <div></div>
        <div style={{display:"flex", justifyContent:"right", width:"90%", marginBottom:"5px"}}><Button variant="outlined">Add Task</Button></div>
      </Card>
    </Modal>
  );
};
