import { useEffect, useRef, useState } from "react"
import { UserAuth } from "../context/AuthContext"
import { Navbar } from "../items/Navbar"
import {Chart} from "react-google-charts"
import { Container, Grid } from "@mui/material"
import { useParams } from "react-router-dom"

export const Project  = ()=>{
    const {uid} = useParams()
    const {user, getUser} = UserAuth()
    const [userInfo, setUserInfo] = useState(null)
    useEffect(()=>{
        console.log("hello world")
        console.log(user)
        
    },[])
    const data = [
    [
      { type: 'string', label: 'Task ID' },
      { type: 'string', label: 'Task Name' },
      { type: 'date', label: 'Start Date' },
      { type: 'date', label: 'End Date' },
      { type: 'number', label: 'Duration' },
      { type: 'number', label: 'Percent Complete' },
      { type: 'string', label: 'Dependencies' },
    ],
    [
      'Task 1',
      'Design',
      new Date(2022, 1, 1),
      new Date(2022, 1, 5),
      null,
      50,
      null,
    ],
    [
      'Task 2',
      'Development',
      new Date(2022, 1, 6),
      new Date(2022, 1, 20),
      null,
      25,
      'Task 1',
    ],
    [
      'Task 3',
      'Testing',
      new Date(2022, 1, 21),
      new Date(2022, 2, 1),
      null,
      0,
      'Task 2, Task 1',
    ],
  ];
  function handleChartSelect(selection) {
    // Handle chart selection events
    console.log(selection);
  }
    return(
        <div>
        <Navbar username={"yassine"+" "+"lastName"} profeilPicture={""}></Navbar>
        <h1 style={{textAlign:"left"}}>Gantt Diagramme</h1>
        
        <Grid container style={{height:"100%"}}>
        <Grid item xs={8} style={{height:"100%"}}>
        <Chart
      chartType="Gantt"
      data={data}
      width="100%"
      height="100%"
      options={{
        gantt: {
          trackHeight: 50,
        },
      }}
    /></Grid>
    <Grid item xs={4} style={{height:"100%"}}><h1>Tasks</h1></Grid>
        
    </Grid>
    {uid}
        </div>
    )
}