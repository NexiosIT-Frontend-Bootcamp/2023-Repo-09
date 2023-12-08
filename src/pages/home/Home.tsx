import React, { useEffect, useState } from 'react';
import { IUser } from '../../types/IUser';
import { useUserContext } from '../../contexts/UserContext';
import { GetUser } from '../../api/User';
import { Container, IconButton, List, ListItem, ListItemButton, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import { SendRounded } from '@mui/icons-material';
import { GetMessages } from '../../api/Message';
import { GetChatrooms } from '../../api/Chatroom';
import { ChatroomsResult, MessagesResult } from '../../types/ApiResults';

const defaultTheme = createTheme();

const Home: React.FC = () => {

    const { jwt } = useUserContext();

    const [users, setUsers] = useState<IUser[]>([]);
    const [usersLoading, setUsersLoading] = useState<boolean>();
    const [usersError, setUsersError] = useState<string>();
    const [inputValue, setInputValue] = useState<string>('');
    const [messages, setMessages] = useState<MessagesResult[]>([]);
    const [chatrooms, setChatrooms] = useState<ChatroomsResult[]>([]);
    const [currentChatroom, setCurrentChatroom] = useState<string>();

	useEffect(() => {
		const loadMessages = async () => {
			if (!jwt) return;

			const messagesResult = await GetMessages(jwt);

			setMessages(messagesResult || []);

			console.log(messagesResult);
		};

		const loadChatrooms = async () => {
			if (!jwt) return;

			const chatroomsResult = await GetChatrooms(jwt);

			setChatrooms(chatroomsResult || []);

			console.log(chatroomsResult);
		};
		
		const getAllUsers = async () => {
			if (!jwt) return [];
		
			setUsersError(undefined);
			setUsersLoading(true);

			const allUsersResult = await GetUser(jwt);

			if (allUsersResult.isSuccess) {
				setUsers(allUsersResult.users || []);
			} else {
				setUsersError(allUsersResult.error);
			}

			setUsersLoading(false);
		};

		getAllUsers();
		loadChatrooms();
		loadMessages();
	}, [jwt]);

	const [textboxes, setTextboxes] = useState<string[]>([]); // Initial state with an empty text box

	const handleChange = (value: string) => {
		const updatedTextboxes = [...textboxes, value];
		setTextboxes(updatedTextboxes);
    setInputValue('');
	};

	return (
	<ThemeProvider theme={defaultTheme}>
	<Container component="main" >
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '200px', padding: '20px', backgroundColor: '#f0f0f0', position: 'fixed', left: 0, top: 0, bottom: 0 }}>
        <Typography variant="h6" style={{ marginBottom: '20px' }}>
          Groups
        </Typography>
        <List>
          {chatrooms.map((group, index) => (
            <ListItemButton key={index} onClick={() => {setCurrentChatroom(group._id)}}>
              {group.name}
            </ListItemButton >
          ))}
        </List>
      </div>

      {/* Main Content */}
      <div style={{ width: '600px', marginLeft: '0px', padding: '20px' }}>
        <div style={{ marginBottom: '10px', width: '300px' }}>
          {messages.filter((message) => message.chatroom === currentChatroom).map((value, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', width: '600px' }}>
              <Typography variant="body1">{value.data}</Typography>
            </div>
          ))}
        </div>
    
        <div style={{position: 'fixed', bottom: 0, left: 10, width: '100%', padding: '10px', backgroundColor: '#fff' }}>
          <form onSubmit={(e) => { e.preventDefault(); handleChange(inputValue); }}>

            <TextField
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              fullWidth id="fullWidth"
              style={{maxWidth: '600px'}}
            />
          <IconButton color="primary" onClick={() => { handleChange(inputValue)}} aria-label="send message">
            <SendRounded style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} />
          </IconButton>
          </form>
        </div>
      </div>
    </div>
	</Container>
	</ThemeProvider>
	);
}

export default Home;