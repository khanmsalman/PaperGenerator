import mongoose, { mongo } from "mongoose";

const genPaper = new mongoose.Schema({
    mcqsArr:[],
    shortArr:[],
    longArr:[],
    pdetails:{
        program:{type:mongoose.Schema.Types.ObjectId, ref:'program'},
        semester:{type:mongoose.Schema.Types.ObjectId, ref:'semester'},
        paper:{type:mongoose.Schema.Types.ObjectId, ref:'newpaper'},
    },
    creator:{
        id:{type:mongoose.Schema.Types.ObjectId, ref:''},
        name:String,
    },
    isLock:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const GenPaperModel = mongoose.model('GenPaper', genPaper)
export default GenPaperModel;