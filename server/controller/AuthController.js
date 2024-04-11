import AuthModel from "../models/AuthModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NewPaperModel } from "../models/PaperDetailModel.js";
import GenPaperModel from "../models/GenPaper.js";

export const signupUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (name && email && password) {
            const User = await AuthModel.findOne({ email })
            if (!User) {
                // generate salt
                const genSalt = await bcrypt.genSalt(10)
                // hashing password
                const hashPassword = await bcrypt.hash(password, genSalt)
                const newUser = new AuthModel({
                    name,
                    email,
                    password: hashPassword,
                    isAdmin: false
                })
                const savedUser = await newUser.save()
                if (savedUser) {
                    res.status(201).json({ message: "User saved Successfully",name:savedUser.name })
                }
            } else {
                res.status(200).json({ message: "Email Already Exists" })
            }
        } else {
            res.status(200).json({ message: "All Fields are required" })
        }
    } catch (error) {
        res.status(404).json({ message: "SomeThing Went Wrong", error })
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email && password) {
            const isUser = await AuthModel.findOne({ email })
            if (isUser) {
                if (isUser.email === email && await (bcrypt.compare(password, isUser.password))) {
                    // generate Tokens
                    const token = jwt.sign({ userID: isUser._id }, "papergenerator", { expiresIn: "2d" })
                    res.status(200).json({ message: "User Login Successfully", token, user: isUser })
                } else {
                    res.status(200).json({ message: "Wrong Credentials" })
                }
            } else {
                res.status(200).json({ message: "Email Id is not found" })
            }
        } else {
            res.status(200).json({ message: "All Fields are Required" })
        }
    } catch (error) {
        res.status(404).json("message something went wrong ", error)
    }
}


export const getAllUsers = async (req, res) => {
    try {
        const users = await AuthModel.find().populate({
            path:'subjects',
            populate:['semester','program'],
        });
        
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json("message something went wrong ", error)
    }
}

export const updateAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await AuthModel.findById(id);
        user.isAdmin = !user.isAdmin;
        user.save();
        res.status(200).json({ message: "Admin Status Updated Successfully", user})
    } catch (error) {
        res.status(404).json("message something went wrong ", error)
    }
}

export const AddSubjectToUser = async (req, res) => {
    const { userId, paperId } = req.body;

    try {
        let user = await AuthModel.findById(userId)
        if(user.subjects.includes(paperId)){
            return res.status(400).json({message:'Subjects is Already Exists!'})
        }
        user.subjects.push(paperId)
        await user.save()
        res.status(201).json(user)

    } catch (error) {
        console.log(error)
    }
}


export const deleteUserSubject = async (req, res) => {
    const { userId, subjectId } = req.body;
    try {
        let user = await AuthModel.findById(userId).populate({
            path:'subjects',
            populate:['semester','program'],
        });
        

        user.subjects = user.subjects.filter((subject)=>{
            return String(subject._id) !== subjectId
        })
        await user.save()

        const users = await AuthModel.find().populate({
            path:'subjects',
            populate:['semester','program'],
        });
        
        res.status(201).json(users)
    } catch (error) {
        console.log(error)
    }
}

export const deleteUserById=async(req,res)=>{
    const { id } = req.params;  
    try {
         await GenPaperModel.deleteMany({"creator.id":id})
        const value = await AuthModel.findByIdAndDelete(id);
        res.status(200).json({message:"User Deleted Successfully"})
    } catch (error) {
        console.log(error)
    }
}