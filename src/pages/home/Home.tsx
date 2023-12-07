import React, { useEffect, useState } from 'react';
import { IUser } from '../../types/IUser';
import { useUserContext } from '../../contexts/UserContext';
import { GetUser } from '../../api/User';
import { Avatar, Box, Button, Container, CssBaseline, Grid, IconButton, Link, List, ListItem, ListItemText, Paper, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import { SendRounded } from '@mui/icons-material';

const defaultTheme = createTheme();

const Home: React.FC = () => {

    const { jwt } = useUserContext();
	const messages: {id:number, text:string}[] = [
		{ id: 1, text: 'Hello there!' },
		{ id: 2, text: 'How are you?' },
		{ id: 3, text: 'This is a test message.' }];

    const [users, setUsers] = useState<IUser[]>([]);
    const [usersLoading, setUsersLoading] = useState<boolean>();
    const [usersError, setUsersError] = useState<string>();
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
		// const loadMessages
			// await GetMessages
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
    }, [jwt]);

	function doNothing(): void {
		console.log("klik");
	}

	const [textboxes, setTextboxes] = useState<string[]>([]); // Initial state with an empty text box

	const addTextBox = () => {
		setTextboxes([...textboxes, '']); // Add a new empty text box to the list
	};

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
          {['test1', 'test2', 'test3'].map((group, index) => (
            <ListItem button key={index}>
              {group}
            </ListItem>
          ))}
        </List>
      </div>

      {/* Main Content */}
      <div style={{ width: '600px', marginLeft: '0px', padding: '20px' }}>
        <div style={{ marginBottom: '10px', width: '300px' }}>
          {textboxes.map((value, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', width: '600px' }}>
              <Typography variant="body1">{value}</Typography>
            </div>
          ))}
        </div>
    
    <div style={{position: 'fixed', bottom: 0, left: 10, width: '100%', padding: '10px', backgroundColor: '#fff' }}>
      <TextField
        value={inputValue}
        label={`Bottom Text Box`}
        onChange={(e) => setInputValue(e.target.value)}
        fullWidth id="fullWidth"
        style={{maxWidth: '600px'}}
      />
		<IconButton color="primary" onClick={() => { handleChange(inputValue)}} aria-label="send message">
			<SendRounded style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} />
		</IconButton>
      </div>
    </div>
    </div>
	</Container>
	</ThemeProvider>
	);
}

export default Home;