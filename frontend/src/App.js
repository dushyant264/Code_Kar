
import './App.css'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState, createContext } from 'react'
import Cookies from 'js-cookie'
// import components
import Navbar from './components/NavBar'
import SignUp from './components/SignUp'
import Login from './components/Login'
import ProblemSet from './components/ProblemSet'

const UserContext= createContext()


function App() {
  // setting states
  const [token, setToken]= useState(Cookies.get('token'))
  const [user, setUser]= useState({})
  const [isLoggedIn, setIsLoggedIn]= useState(false)

  // get n set user data

  useEffect(()=>{
    (
      async()=>{
        const USER_URL= 'http://localhost:5000/api/user'
        const res= await axios.get(USER_URL,{headers:{Authorization: `Bearer ${token}`}}) // make api call
        if(res.status===200){
          setUser(res.data)
          setIsLoggedIn(true)
      } else{
        setIsLoggedIn(false)
      }
    }
    )()
  },[token])

  return (
   <UserContext.Provider value={{ user, token, setToken, isLoggedIn, setIsLoggedIn}}>
    <div className='App'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<ProblemSet/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </div>
   </UserContext.Provider>
  );
}

export default App;
export { UserContext }
