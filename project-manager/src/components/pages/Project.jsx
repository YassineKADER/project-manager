import { useEffect, useRef, useState } from "react"
import { UserAuth } from "../context/AuthContext"
import { Navbar } from "../items/Navbar"
import {Chart} from "react-google-charts"
import { Grid } from "@mui/material"

export const Project  = ()=>{
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
        <Grid container>
        <Grid item xs={8}>
        <Chart
      chartType="Gantt"
      data={data}
      width="100%"
      height="400px"
      options={{
        gantt: {
          trackHeight: 30,
        },
      }}
    />
    <Grid item xs={1}><h1>Tasks</h1></Grid>
        </Grid>
    </Grid>

        </div>
    )
}