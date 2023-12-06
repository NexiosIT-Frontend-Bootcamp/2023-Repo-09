import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'
import { UserContextProvider } from './contexts/Context.tsx'


const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={{theme}}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
