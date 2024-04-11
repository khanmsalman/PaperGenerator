import mongoose from "mongoose";


// Short Question Schema
const shortQtnSchema = new mongoose.Schema({
    sQuestion:{type:String, required:true,trim:true},
    paperDetails:{
        program:{type:String, required:true},
        semester:{type:String, required:true},
        paper:{type:String, required:true},
    }
}) 

// Long Question Schema
const longQtnSchema = new mongoose.Schema({
    lQuestion:{type:String, required:true,trim:true},    
    paperDetails:{
        program:String,
        semester:String,
        paper:{type:String, required:true},
    }
})

// MCQ's Schema
const mcqsSchema = new mongoose.Schema({
    mcq:{type:String, required:true,trim:true},
    option1:{type:String,required:true,trim:true},
    option2:{type:String,required:true,trim:true},
    option3:{type:String,required:true,trim:true},
    option4:{type:String,trim:true},
    paperDetails:{
        program:String,
        semester:String,
        paper:{type:String, required:true},
    }
})

const shortQtnModel = mongoose.model('shortQtn', shortQtnSchema);
const longQtnModel = mongoose.model('longQtn', longQtnSchema);
const mcqsModel = mongoose.model('mcqs', mcqsSchema);

export {shortQtnModel, longQtnModel,mcqsModel };