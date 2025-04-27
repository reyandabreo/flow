import React, { useState } from 'react';
import Papa from 'papaparse';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { UploadFile } from '@mui/icons-material';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function Dashboard() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState({});

  useEffect(() => {
    const savedPlayers = localStorage.getItem('players');
    const savedTeams = localStorage.getItem('teams');

    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers));
    }
    if (savedTeams) {
      setTeams(JSON.parse(savedTeams));
    }
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedPlayers = results.data.map(player => ({
          name: player.PLAYER,
          team: player.TEAM,
          goals: parseInt(player.G, 10) || 0,
          assists: parseInt(player.ASST, 10) || 0,
          shots: parseInt(player.SHOTS, 10) || 0,
          sog: parseInt(player.SOG, 10) || 0,
          minutes: parseInt(player.MIN, 10) || 0,
        })).filter(p => p.name);

        setPlayers(parsedPlayers);

        const teamStats = {};
        parsedPlayers.forEach(player => {
          if (!teamStats[player.team]) {
            teamStats[player.team] = { goals: 0, assists: 0 };
          }
          teamStats[player.team].goals += player.goals;
          teamStats[player.team].assists += player.assists;
        });
        setTeams(teamStats);
      }
    });
  };

  const topGoals = [...players].sort((a, b) => b.goals - a.goals).slice(0, 5);
  const topAssists = [...players].sort((a, b) => b.assists - a.assists).slice(0, 5);
  const efficiency = [...players]
    .filter(p => p.shots > 0)
    .map(p => ({
      ...p,
      efficiency: (p.goals / p.shots).toFixed(2)
    }))
    .sort((a, b) => b.efficiency - a.efficiency)
    .slice(0, 5);

  const accuracy = [...players]
    .filter(p => p.shots > 0)
    .map(p => ({
      ...p,
      accuracy: ((p.sog / p.shots) * 100).toFixed(1)
    }))
    .sort((a, b) => b.accuracy - a.accuracy)
    .slice(0, 5);

  const topMinutes = [...players]
    .sort((a, b) => b.minutes - a.minutes)
    .slice(0, 5);

  const teamNames = Object.keys(teams);
  const teamGoals = Object.values(teams).map(t => t.goals);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Sports Analytics Dashboard
      </Typography>

      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          component="label"
          startIcon={<UploadFile />}
          sx={{ mb: 2 }}
        >
          Upload CSV
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            hidden
          />
        </Button>
      </Box>

      {players.length > 0 && (
        <Grid container spacing={6}>
          {/* Top 5 Goalscorers */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Top 5 Players - Goals
                </Typography>
                <Bar
                  data={{
                    labels: topGoals.map(p => p.name),
                    datasets: [{
                      label: 'Goals',
                      data: topGoals.map(p => p.goals),
                      backgroundColor: 'rgba(75,192,192,0.6)'
                    }]
                  }}
                  options={{ responsive: true, plugins: { legend: { display: false }}}}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Top 5 Assisters */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Top 5 Players - Assists
                </Typography>
                <Bar
                  data={{
                    labels: topAssists.map(p => p.name),
                    datasets: [{
                      label: 'Assists',
                      data: topAssists.map(p => p.assists),
                      backgroundColor: 'rgba(153,102,255,0.6)'
                    }]
                  }}
                  options={{ responsive: true, plugins: { legend: { display: false }}}}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Team Goals Comparison */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Team Goals Comparison
                </Typography>
                <Bar
                  data={{
                    labels: teamNames,
                    datasets: [{
                      label: 'Team Goals',
                      data: teamGoals,
                      backgroundColor: 'rgba(255,159,64,0.6)'
                    }]
                  }}
                  options={{ responsive: true, plugins: { legend: { display: false }}}}
                />
              </CardContent>
            </Card>
        </Grid>
        
        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        {/* Efficiency */}
        <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom align="center">
                Top 5 Most Efficient Players (Goals per Shot)
                </Typography>
                <Bar
                data={{
                    labels: efficiency.map((p) => p.name),
                    datasets: [
                    {
                        label: 'Efficiency',
                        data: efficiency.map((p) => p.efficiency),
                        backgroundColor: 'rgba(255,99,132,0.6)',
                    },
                    ],
                }}
                options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                }}
                />
            </CardContent>
            </Card>
        </Grid>

        {/* Accuracy */}
        <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom align="center">
                Top 5 Most Accurate Players (Shots on Goal %)
                </Typography>
                <Bar
                data={{
                    labels: accuracy.map((p) => p.name),
                    datasets: [
                    {
                        label: 'Accuracy',
                        data: accuracy.map((p) => p.accuracy),
                        backgroundColor: 'rgba(54,162,235,0.6)',
                    },
                    ],
                }}
                options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                }}
                />
            </CardContent>
            </Card>
        </Grid>

        {/* Top Minutes Played */}
        <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom align="center">
                Top 5 Players - Minutes Played
                </Typography>
                <Bar
                data={{
                    labels: topMinutes.map((p) => p.name),
                    datasets: [
                    {
                        label: 'Minutes',
                        data: topMinutes.map((p) => p.minutes),
                        backgroundColor: 'rgba(255,206,86,0.6)',
                    },
                    ],
                }}
                options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                }}
                />
            </CardContent>
            </Card>
          </Grid>
        </Grid>
          {/* Full Table */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Full Player Stats Table
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Player</TableCell>
                        <TableCell>Team</TableCell>
                        <TableCell>Goals</TableCell>
                        <TableCell>Assists</TableCell>
                        <TableCell>Shots</TableCell>
                        <TableCell>Shots on Goal</TableCell>
                        <TableCell>Minutes</TableCell>
                        <TableCell>Efficiency</TableCell>
                        <TableCell>Accuracy (%)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {players.map((p, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{p.name}</TableCell>
                          <TableCell>{p.team}</TableCell>
                          <TableCell>{p.goals}</TableCell>
                          <TableCell>{p.assists}</TableCell>
                          <TableCell>{p.shots}</TableCell>
                          <TableCell>{p.sog}</TableCell>
                          <TableCell>{p.minutes}</TableCell>
                          <TableCell>{(p.shots > 0 ? (p.goals / p.shots).toFixed(2) : "-")}</TableCell>
                          <TableCell>{(p.shots > 0 ? ((p.sog / p.shots) * 100).toFixed(1) : "-")}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Dashboard;