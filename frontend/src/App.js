import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'
import React, { useMemo, useEffect, useState, createContext } from 'react'
import Cookies from 'js-cookie'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from './theme';
import { Box } from '@mui/material';

// import components
import Navbar from './components/NavBar'
import SignUp from './components/SignUp'
import Login from './components/Login'
import ProblemSet from './components/ProblemSet'
import LeaderBoard from './components/LeaderBoard'
import ShowProblem from './components/ShowProblem/ShowProblem'
import AddProblem from './components/AddProblem'
import Profile from './components/Profile'
import Footer from './components/footer'

const UserContext= createContext()


function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // setting states
  const [token, setToken]= useState(Cookies.get('token'))
  const [user, setUser]= useState({})
  const [isLoggedIn, setIsLoggedIn]= useState(false)
  const navigate= useNavigate()

  // get n set user data

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const USER_URL = 'https://code-kar.onrender.com/api/user';
          const res = await axios.get(USER_URL, { headers: { Authorization: `Bearer ${token}` } });
          if (res.status === 200) {
            setUser(res.data);
            setIsLoggedIn(true);
            navigate('/');
          } else {
            setIsLoggedIn(false);
            navigate('/login');
          }
        } catch (error) {
          console.error(error);
          setIsLoggedIn(false);
          navigate('/login');
        }
      } else {
        setIsLoggedIn(false);
        navigate('/login');
      }
    };
  
    checkUserAuthentication();
  }, []); // Removed dependency on token to ensure this runs once on component mount

  return (
   <UserContext.Provider value={{ user, token, setToken, isLoggedIn, setIsLoggedIn}}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path='/' element={<ProblemSet/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/leader-board' element={<LeaderBoard/>}/>
            <Route path='/problem/:problemSlug' element={<ShowProblem/>}/>
            <Route path='/admin/add-problem' element={<AddProblem/>}/>
            <Route path='/profile' element={<Profile/>}/>
          </Routes>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
   </UserContext.Provider>
  );
}

export default App;
export { UserContext }
