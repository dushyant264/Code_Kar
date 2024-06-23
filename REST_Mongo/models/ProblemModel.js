const mongoose= require('mongoose')
const path= require('path')
const slugify= require('slugify')
const writeInFile = require('../utils/writeInFile')
const { type } = require('os')

const ProblemSchema=mongoose.Schema({
    slug: { type:String, required:true},
    
})