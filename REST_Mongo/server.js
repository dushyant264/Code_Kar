const dotenv = require('dotenv');  // environment variable

// required modules

const express = require('express');
const colors = require('colors');
const { connectDB } = require('./config/db');

// import  routes
  const UserRoutes = require('./Routes/UserRoutes')
// server basics
dotenv.config();
const app = express();
const port=process.env.PORT || 5000;
connectDB()

// parse json and urlencoded data
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// api endpoint routes
app.use('/api/',UserRoutes)

app.listen(port,
    console.log('Server is running on port 5000'.magenta.blue.italic)
)