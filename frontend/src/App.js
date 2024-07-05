
import './App.css'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState, createContext } from 'react'
import Cookies from 'js-cookie'

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
        const USER_URL= 'https://code-kar.onrender.com/api/user'
        const res= await axios.get(USER_URL,{Headers:{Authorization: token}}) // make api call
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

    </div>
   </UserContext.Provider>
  );
}

export default App;
