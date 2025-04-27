// filepath: /run/media/reyandabreo/Projects/React/flow/src/App.js
import React from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import PlayerStatus from './components/player-status'; // Import the Player Status page

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/player-status" element={<PlayerStatus />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;