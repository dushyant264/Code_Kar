
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState, createContext } from 'react'
import Cookies from 'js-cookie'
// import components
import Navbar from './components/NavBar'
import SignUp from './components/SignUp'
import Login from './components/Login'
import ProblemSet from './components/ProblemSet'
import LeaderBoard from './components/LeaderBoard'

const UserContext= createContext()


function App() {
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
          const USER_URL = 'http://localhost:5000/api/user';
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
    <div className='App'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<ProblemSet/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/leader-board' element={<LeaderBoard/>}/>
      </Routes>
    </div>
   </UserContext.Provider>
  );
}

export default App;
export { UserContext }
