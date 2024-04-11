import mongoose from "mongoose";

//Bs Program Schema
const ProgramSchema = new mongoose.Schema({
    program:{type:String, required:true, trim:true}
})
// Semester Schema
const SemesterSchema = new mongoose.Schema({
    semester:{type:String, required:true, trim:true},
})
// Paper Schema
const NewPaperSchema = new mongoose.Schema({
    newpaper:{type:String, required:true, trim:true},
    semester:{type:mongoose.Schema.Types.ObjectId,reqiured:true, ref:'semester'},
    program:{type:mongoose.Schema.Types.ObjectId,required:true, ref:'program'}
})

const ProgramModel = mongoose.model('program',ProgramSchema);
const SemesterModel = mongoose.model('semester',SemesterSchema);
const NewPaperModel = mongoose.model('newpaper',NewPaperSchema);
 
export {ProgramModel,SemesterModel ,NewPaperModel};