const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

const app = express();
dotenv.config();

const port=process.env.PORT || 5000;

connectDB()

app.listen(5000,
    console.log('Server is running on port 3000'.magenta.blue.italic)
)