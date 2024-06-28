const dotenv = require('dotenv');  // environment variable

// required modules

const express = require('express');
const cors = require('cors');
const colors = require('colors');
const { connectDB } = require('./config/db');

// import  routes
  const UserRoutes = require('./Routes/UserRoutes')
  const AdminRoutes = require('./Routes/AdminRoutes')
  
// server basics
dotenv.config();
const app = express();
const port=process.env.PORT || 5000;
connectDB()

// cors allow headers n cookies
app.use(cors({
    origin: 'http://localhost:3000',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

// parse json and urlencoded data
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// api endpoint User routes
app.use('/api/',UserRoutes)

// admin endpoints
 app.use('/admin/',AdminRoutes)

app.listen(port,
    console.log('Server is running on port 5000'.magenta.blue.italic)
)