import {
  Avatar,
  Box,
  Card,
  Chip,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import Edit from "@mui/icons-material/Edit";

export const ProjectCard = ({username, profeilPicture, progress, projectName, projectLink}) => {
  return (
    <div>
      <Card variant="outlined">
        <Box sx={{ p: 2, display: "flex" }}>
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
    </div>
  );
};
