import { Grid } from "@mui/material";
import { ProjectCard } from "./ProjectCard";
import { useEffect, useState } from "react";

export const Projects = ({projects}) => {
    const [components, SetComponents] = useState(null)
    let rendered = true
    useEffect(()=>{
        SetComponents(rendered && projects && projects.map((item) => (
            <Grid item xs={6} md={3} key={item.id}>
                <ProjectCard username={item.leaderData.firstName + " " + item.leaderData.lastName} projectName={item.projectData.name} profeilPicture={item.leaderData.profeilPhoto} uid={item.id} progress={item.projectData.progress}/>
            </Grid>
        )))
        if(components != null){
            rendered = false
        }
    })
    

    return (
        <>
            {components}
        </>
    );
}