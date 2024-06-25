const mongoose= require('mongoose')
const path= require('path')
const slugify= require('slugify')
const writeInFile = require('../utils/writeInFile')

const ProblemSchema=mongoose.Schema({
    slug: { type:String, required:true},
    title: { type:String, required:true},
    description: { type:String, required:true},
    difficulty: { type:String, required:true, enum:['easy', 'medium', 'hard']},
    input: { type:String, required:true},
    output: { type:String, required:true},
})

// before saving slugify the title
ProblemSchema.pre('save',function(next){
    console.log(this)
    this.slug= slugify(this.title,{lower:true, strict:true})
    let inputdir= path.join(__dirname,'../inputs')
    writeInFile(inputdir,this.slug+'.txt',this.input)
    this.output=this.output.trim()
    next()
})

// before update

ProblemSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();
    if (update.title) {
        update.slug = slugify(update.title, {lower: true, strict: true});
    }
    if (update.input) {
        let inputdir = path.join(__dirname, '../inputs');
        writeInFile(inputdir, update.slug + '.txt', update.input);
    }
    if (update.output) {
        update.output = update.output.trim();
    }
    this.setUpdate(update);
    next();
});

const Problem= mongoose.model('Problem',ProblemSchema)

module.exports= Problem