import React from 'react';
import { Fab } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

function Chat() {
  return (
    <Fab color="secondary" aria-label="add">
      <ChatIcon />
    </Fab>
  );
}

export default Chat;