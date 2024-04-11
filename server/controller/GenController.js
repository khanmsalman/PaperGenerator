import AuthModel from "../models/AuthModel.js";
import GenPaperModel from "../models/GenPaper.js";
import { NewPaperModel } from "../models/PaperDetailModel.js";
import { shortQtnModel, longQtnModel, mcqsModel } from "../models/PaperQtnModel.js";

export const gentPaper = async (req, res) => {
  const { user } = req;

  const { program, semester, newpaper, lgQtn, stQtn, mcqs } = req.body;
  const shortArr = [];
  const longArr = [];
  const mcqsArr = [];
  const pdetails = { program, semester, paper: newpaper }
  
  try {
    if (program) {
      if (semester) {
        if (newpaper) {
          const shorts = await shortQtnModel.find({ paperDetails: { program: program, semester: semester, paper: newpaper } })
          const longs = await longQtnModel.find({ paperDetails: { program: program, semester: semester, paper: newpaper } })
          const mcqes = await mcqsModel.find({ paperDetails: { program: program, semester: semester, paper: newpaper } })

          

          if (mcqes.length <= 0 && shorts.length <= 0 && longs.length <= 0) {
            return res.status(200).json({ message: "You have no Mcq's, shorts Question and long Question", status: 'warning' })
          }
          if (mcqes.length < mcqs) {
            return res.status(200).json({ message: `Your Mcq's is less than ${mcqs}`, status: 'warning' })
          }
          if (shorts.length < stQtn) {
            return res.status(200).json({ message: `Your Short Question is less than ${stQtn}`, status: 'warning' })
          }
          if (longs.length < lgQtn) {
            return res.status(200).json({ message: `Your Long Questions is less than ${lgQtn}`, status: 'warning' })
          }
          if (mcqs === '') {
            return res.status(200).json({ "message": `Enter any number of mcqs`, status: 'warning' })
          }
          if (stQtn === '') {
            return res.status(200).json({ "message": `Enter any number of Short Questions`, status: 'warning' })
          }
          if (lgQtn === '') {
            return res.status(200).json({ "message": `Enter any number of Long Question`, status: 'warning' })
          }


          //generate short questions
          let i = 0;
          while (i < stQtn) {
            const num = Math.floor(0 + Math.random() * shorts.length)
            if (!shortArr.includes(shorts[num])) {
              shortArr.push(shorts[num])
            } else {
              continue;
            }
            i++;
          }
          //generate long questions
          let j = 0;
          while (j < lgQtn) {
            const num = Math.floor(0 + Math.random() * longs.length)
            if (!longArr.includes(longs[num])) {
              longArr.push(longs[num])
            } else {
              continue;
            }
            j++;
          }
          // generate mcqs
          let k = 0;
          while (k < mcqs) {
            const num = Math.floor(0 + Math.random() * mcqes.length)
            if (!mcqsArr.includes(mcqes[num])) {
              mcqsArr.push(mcqes[num])
            } else {
              continue;
            }
            k++;
          }
          const newGenPaper = new GenPaperModel({
            mcqsArr: mcqsArr,
            shortArr: shortArr,
            longArr: longArr,
            pdetails: {
              program:pdetails.program,
              semester:pdetails.semester,
              paper:pdetails.paper
            },
            creator: {
              id: user._id,
              name: user.name,
            },
          })
          const savedPaper = await newGenPaper.save();
          res.status(200).json({ message: "Successfully....", id: savedPaper._id, status: 'success' });
        }
      }
    }

  } catch (err) {
    res.status(400).json({ msg: "failed in server", status: "failed" });
  }
};

export const getGentPaper = async (req, res) => {
  const { id } = req.params;
  try {
    const paper = await GenPaperModel.findOne({ _id: id }).populate({
      path:'pdetails',
      populate:['program','semester','paper']
    })
    res.status(200).json(paper)
  } catch (error) {
    res.status(404).json({ message: "failed in server while get gen paper",error:error.message })
  }
}

export const getAllPapers = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await AuthModel.findById(_id)
    const loginsPapers = await GenPaperModel.find({ "creator.id": _id }).populate({
      path:'pdetails',
      populate:['program','semester','paper']
    })
    const Papers = await GenPaperModel.find().populate({
      path:'pdetails',
      populate:['program','semester','paper']
    })

    if (user.isAdmin) {
      res.status(200).json({ loginsPapers, Papers})
    } else {
      res.status(200).json({ loginsPapers, user: 'notAdmin' })
    }

  } catch (error) {
    res.status(404).json({ message: "failed in server while get all papers" })
  }
}


export const getOverallPapers=async(req,res)=>{
  try {
    const allPapers =await NewPaperModel.find().sort({newpaper:1});
    res.status(200).json(allPapers)    
  } catch (error) {
    res.status(400).json(error.message)
  }
}

export const NumOfPaper = async (req, res) => {
  const { program, semester, newpaper } = req.body
  try {
    const shorts = await shortQtnModel.find({ paperDetails: { program:program._id, semester:semester._id, paper: newpaper } })
    const longs = await longQtnModel.find({ paperDetails: { program:program._id, semester:semester._id, paper: newpaper } })
    const mcqs = await mcqsModel.find({ paperDetails: { program:program._id, semester:semester._id, paper: newpaper } })
    const numOfQtn = {
      numOfShorts: shorts.length,
      numOfLongs: longs.length,
      numOfMcqs: mcqs.length
    }
    res.status(200).json({ message: 'num of papers', numOfQtn })
  } catch (error) {
    res.status(400).json({ message: "Some thing went wrong", error })
  }
}


export const deletePaperById = async (req, res) => {
  const { id } = req.params;
  try {
    const paper = await GenPaperModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Paper deleted Successfully" })
  } catch (error) {
    res.status(404).json({ message: "something went wrong in server while delete paper: ", error })
  }
}

export const lockPaper = async (req, res) => {
  const { id } = req.params;
  try {
    const paperById = await GenPaperModel.findById(id);

    paperById.isLock = !paperById.isLock;
    const newPaper = await GenPaperModel.findByIdAndUpdate(id, paperById, { new: true }).populate({
      path:'pdetails',
      populate:['program','semester','paper']
    })

    res.status(200).json({ message: "Papar is Locked", newPaper })
  } catch (error) {
    res.status(500).json(error.message)
  }
}