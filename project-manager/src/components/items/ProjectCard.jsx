import {
  Avatar,
  Box,
  Card,
  Chip,
  Divider,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import Edit from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EditProject } from "./EditProject";


export const ProjectCard = ({username, profeilPicture, progress, projectName, projectLink, uid}) => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const [editName, setEditName] = useState(false)

  const handleRightClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div onContextMenu={handleRightClick}>
    <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>{handleClose(), setEditName(true)}}>Edit</MenuItem>
        <MenuItem onClick={()=>{handleClose(), console.log("remove")}}>Remove</MenuItem>
      </Menu>
      <Card variant="outlined">
        <Box sx={{ p: 2, display: "flex"}}  onClick={()=>navigate("/project/"+uid)} style={{}}>
          <Avatar src={profeilPicture} />
          <Stack spacing={0.5}>
            <Typography fontWeight={700} style={{ marginLeft: 5 }}>
              {projectName}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ marginLeft: 5 }}>
              {username}
            </Typography>
          </Stack>
        </Box>
        <Divider />
        <Stack
          direction="column"
          alignItems="left"
          justifyContent="space-between"
          sx={{ px: 2, py: 1, bgcolor: "background.default" }}
        >
        <Typography variant="body2" style={{textAlign:"left",}}>Progress:</Typography>
        <Box sx={{width: '100%'}}><LinearProgress variant="determinate" value={progress} style={{borderRadius:5,height:10, backgroundColor:'#E5E5E5',border:'1px solid #E5E5E5',marginTop:5}}></LinearProgress></Box>
        </Stack>
      </Card>
      <EditProject uid={uid} isopen={editName} isopenSet={setEditName}></EditProject>
    </div>
  );
};
