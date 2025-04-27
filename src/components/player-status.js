import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, Card, Grid, CircularProgress, Avatar } from '@mui/material';
import Papa from 'papaparse';

function PlayerStatus() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch('/data.csv') // Your CSV should be inside the 'public' folder
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedPlayers = results.data.map((player) => ({
              name: player.PLAYER,
              team: player.TEAM,
              goals: parseInt(player.G, 10) || 0,
              assists: parseInt(player.ASST, 10) || 0,
              shots: parseInt(player.SHOTS, 10) || 0,
              sog: parseInt(player.SOG, 10) || 0,
              minutes: parseInt(player.MIN, 10) || 0,
              avatar: player.AVATAR || '', // optional avatar
            }));
            setPlayers(parsedPlayers);
          },
        });
      })
      .catch((error) => {
        console.error('Error loading CSV file:', error);
      });
  }, []);

  const renderStatCircle = (label, value, maxValue, color) => (
    <Box sx={{ textAlign: 'center', mx: 1, my: 2 }}>
      <CircularProgress
        variant="determinate"
        value={(value / maxValue) * 100}
        size={70}
        thickness={5}
        sx={{
          color,
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          },
        }}
      />
      <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold' }}>
        {value}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {label}
      </Typography>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
        Player Performance Dashboard
      </Typography>

      {players.length > 0 ? (
        <Grid container spacing={4}>
          {players.map((player, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  backgroundColor: '#1e1e1e',
                  color: '#ffffff',
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                  borderRadius: 4,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  },
                }}
              >
                <Avatar
                  src={player.avatar}
                  alt={player.name}
                  sx={{
                    width: 90,
                    height: 90,
                    border: '3px solid #4caf50',
                    mb: 2,
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  {player.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'gray', mb: 2, textAlign: 'center' }}>
                  {player.team}
                </Typography>

                {/* Player Stats */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {renderStatCircle('Goals', player.goals, 50, '#4caf50')}
                  {renderStatCircle('Assists', player.assists, 20, '#3f51b5')}
                  {renderStatCircle('Shots', player.shots, 100, '#ff9800')}
                  {renderStatCircle('SOG', player.sog, 100, '#2196f3')}
                  {renderStatCircle('Minutes', player.minutes, 4000, '#ffeb3b')}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography align="center" color="textSecondary" sx={{ mt: 4 }}>
          Loading player data...
        </Typography>
      )}
    </Container>
  );
}

export default PlayerStatus;
