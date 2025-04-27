import React from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardContent } from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import InsightsIcon from '@mui/icons-material/Insights';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function HomePage() {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('/landing.jpg') center/cover no-repeat`,
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          paddingTop: 12,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            Football Intelligence Hub
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: '#ccc' }}>
            Dive into player stats, real-time sensor data, and smart insights.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              px: 5,
              py: 1.8,
              fontSize: '1.2rem',
              borderRadius: '30px',
              backgroundColor: '#ff4081',
              '&:hover': { backgroundColor: '#f50057' },
            }}
            onClick={handleGoToDashboard}
          >
            Explore Dashboard
          </Button>
        </motion.div>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 2,
          position: 'relative',
          minHeight: '50vh',
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 10, mb: 6 }}>
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                icon: <SportsSoccerIcon sx={{ fontSize: 50, color: '#4caf50' }} />,
                title: 'Real-Time Tracking',
                description: 'Get live sensor data on player movements, speed, and endurance.',
              },
              {
                icon: <InsightsIcon sx={{ fontSize: 50, color: '#fbc02d' }} />,
                title: 'Smart Analytics',
                description: 'Analyze player performance, fitness trends, and match readiness.',
              },
              {
                icon: <BarChartIcon sx={{ fontSize: 50, color: '#29b6f6' }} />,
                title: 'Advanced Visuals',
                description: 'Interactive charts and graphs to enhance player evaluations.',
              },
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      backdropFilter: 'blur(10px)',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      textAlign: 'center',
                      p: 4,
                      borderRadius: '20px',
                      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                      border: '1px solid rgba(255, 255, 255, 0.18)',
                    }}
                  >
                    {feature.icon}
                    <CardContent>
                      <Typography variant="h5" sx={{ mt: 2 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1, color: '#ccc' }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage;
