// filepath: /run/media/reyandabreo/Projects/React/flow/src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton } from '@mui/material';
import { Home, BarChart, Dashboard } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Left Section */}
        <IconButton edge="start" color="inherit" aria-label="home" sx={{ mr: 2 }}>
          <Home />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sports Analytics
        </Typography>

        {/* Center Section */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/" startIcon={<Home />}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/player-status" startIcon={<BarChart />}>
            Player Stats
          </Button>
          <Button color="inherit" component={Link} to="/" startIcon={<Dashboard />}>
            Dashboard
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;