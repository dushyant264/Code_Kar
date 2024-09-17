import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import axios from 'axios';
import { Box, Typography, Avatar, Paper, CircularProgress } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Profile = () => {
  const { user, token ,isLoggedIn} = useContext(UserContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate= useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
        navigate('/login');
    }
}, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`https://code-kar.onrender.com/api/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfileData(response.data);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!profileData) return null;

  const chartData = Object.entries(profileData.problemStats).map(([difficulty, count]) => ({
    difficulty,
    count
  }));

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: 'auto' }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3, display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ width: 100, height: 100, mr: 3 }}>{profileData.name[0]}</Avatar>
        <Box>
          <Typography variant="h4">{profileData.name}</Typography>
          <Typography variant="body1">Rank: {profileData.rank}</Typography>
          <Typography variant="body1">Total Problems Solved: {profileData.totalSolved}</Typography>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Problems Solved by Difficulty</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="difficulty" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default Profile;
