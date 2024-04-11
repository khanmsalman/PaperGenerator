import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subjects:[{type:mongoose.Schema.Types.ObjectId, ref:'newpaper'}],
    superAdmin: {type:Boolean, default:false},
    isAdmin: { type:Boolean, default:false}
    // isAdmin: false // an alternate for above line
},{
    timestamps:true
})

const AuthModel = mongoose.model('User', AuthSchema);

export default AuthModel;