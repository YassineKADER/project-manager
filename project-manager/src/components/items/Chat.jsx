import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc} from 'firebase/firestore/lite';
import {onSnapshot} from 'firebase/firestore'
import { Button, Card, Input, TextField, Typography} from '@mui/material';
import Close from "@mui/icons-material/Close"
import Send from "@mui/icons-material/Send"
import { UserAuth } from '../context/AuthContext';
import Draggable from 'react-draggable';

const ChatComponent = ({ db, projectId, userData, open, onClose}) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [messageObjects, setObjects] = useState([])
  const [user, setUser] = useState({})
  const {getUser} = UserAuth()
  useEffect(() => {
    const fetchMessages = async () => {
      const projectRef = doc(db, 'projects', projectId);
      const projectSnapshot = await getDoc(projectRef);
        const projectData = projectSnapshot.data();
        if (projectData && projectData.messages) {
          let messages = []
          for(let message of projectData.messages){
            messages.push(message.message)
          }
          setMessages(messages);
          setObjects(projectData.messages)
        } else {
          setMessages([]);
        }
      }
    getUser(userData.email).then((test)=>{setUser(test)})
    fetchMessages();
  }, [db, projectId, messageObjects]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === '') {
      return;
    }
    console.log(user)
    const updatedMessages = [...messageObjects, {user:user.firstName+" "+user.lastName, message: inputText}];
    const updatedMessagesText = [...messages, inputText]

    const projectRef = doc(db, 'projects', projectId);
    await setDoc(projectRef, { messages: updatedMessages }, { merge: true });

    setMessages(updatedMessagesText);
    setInputText('');
  };

  return (open &&
    <Draggable>
    <div style={{right:"20px",bottom:"20px"}}>
    <Card variant='outlined' style={{width:"20%", padding:"5px"}}>
      <div style={{display:"flex", justifyContent:"space-between"}}><Typography variant="h6">Chat</Typography><Button onClick={onClose}><Close  ></Close></Button></div>
      <div style={{margin:"10px", maxHeight:"250px",height:'90%', overflowY:"scroll"}}>
        {messageObjects.map((message, index) => {
          const sentByMe = (message.user == user.firstName+" "+user.lastName) ? true:false
          const styling = (sentByMe) ? "right" : "left"
          return (<div style={{width:"100%", display:"flex", justifyContent:styling, alignItems:styling,}}><div style={{display:"flex", flexDirection:"column", alignItems:styling}}><Typography variant='caption'>{message.user}</Typography><Typography key={index} style={{wordBreak: 'break-all',}}>{message.message}</Typography></div></div>)
        })}
      </div>
      <div style={{display:"flex",alignItems:"center", justifyContent:"center", gap:"5px"}}>
      <Input
        label="Message"
        placeholder='Message'
        value={inputText}
        onChange={handleInputChange}
      />
      <Button variant="contained" onClick={handleSendMessage}>
        <Send></Send>
      </Button>
      </div>
      </Card>
    </div>
    </Draggable>
  );
};

export default ChatComponent;
