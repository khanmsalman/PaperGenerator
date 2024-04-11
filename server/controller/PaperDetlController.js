import { ProgramModel, SemesterModel, NewPaperModel } from "../models/PaperDetailModel.js";
import { shortQtnModel, longQtnModel, mcqsModel } from "../models/PaperQtnModel.js";

export const addProgram = async (req, res) => {
  const { program } = req.body;
  let isMatch = false;
  try {
    const findProgram = await ProgramModel.findOne({ program })

    if (findProgram) {
      return res.status(200).json({ message: `${program} is Already Available in Programs`, status: "warning" });
    }
    if (program) {
      const newProgram = new ProgramModel({
        program: program,
      });
      const savedProgram = await newProgram.save();
      if (savedProgram) {
        res.status(200).json({ msg: "Program saved successfully", status: "success" });
      }
    } else {
      res
        .status(200)
        .json({ msg: "Program field is Required", status: "warning" });
    }
  } catch (err) {
    res.status(400).json({
      msg: "Some thing went wrong in server while save program",
      status: "error",
    });
  }
};

export const getProgram = async (req, res) => {
  try {
    const programs = await ProgramModel.find({});
    res.status(200).json({ programs: programs });
  } catch (err) {
    res
      .status(404)
      .json({ msg: "some thing went wrong in server while get Program" });
  }
};

export const addSemester = async (req, res) => {
  const { semester } = req.body;

  try {
    if (semester) {
      const newSemester = new SemesterModel({
        semester: semester,
      });
      const savedSemester = await newSemester.save();
      if (savedSemester) {
        res.status(200).json({ msg: "Semester saved successfully" });
      }
    } else {
      res.status(200).json({ msg: "Semester Field is Required" });
    }
  } catch (err) {
    res
      .status(400)
      .json({ msg: "Some thing went wrong in server while save program" });
  }
};

export const getSemester = async (req, res) => {
  try {
    const semesters = await SemesterModel.find({});
    res.status(200).json({ semesters: semesters });
  } catch (err) {
    res.status(400).json({ msg: "something went wrong in server" });
  }
};

export const addPaper = async (req, res) => {
  const { paper,program,semester } = req.body;
  try {
    if (paper) {
      const newPaper = new NewPaperModel({
        newpaper: paper,
        program, 
        semester
      });

      const savedPaper = await newPaper.save(); 
      if (savedPaper) {
        res.status(200).json({ msg: "Paper saved successfully" });
      }
      // const result = await NewPaperModel.find({});
      
    } else {
      res.status(200).json({ msg: "Paper Field is Required" });
    }
  } catch (err) {
    res
      .status(400)
      .json({ msg: "Some thing went wrong in server while save program" });
  }
};

export const getPapers = async (req, res) => {
  try {
    // .skip(4) means skip first four records
    // .limit(4) means remove recors after 4
    const papers = await NewPaperModel.find();
    res.status(200).json({ papers, isSuccess: true });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Paper not found in DB, Some thing went wrong", error });
  }
};

export const addShortQtn = async (req, res) => {
  const { sQuestion, paperDetails } = req.body;
  const { program, semester, paper } = paperDetails;


  try {
    if (program) {
      if (semester) {
        if (paper) {
          if (sQuestion) {
            const newQtn = new shortQtnModel({
              sQuestion,
              paperDetails: {
                program:program._id,
                semester:semester._id,
                paper:paper._id,
              },
            });
            let shortqtn = await newQtn.save();
            if (shortqtn) {
              res
                .status(201)
                .json({ message: "Short Qtn Saved Successfully...",saved:true });
            }
          } else {
            res.status(200).json({ message: "Question Must be required" });
          }
        } else {
          res.status(200).json({ message: "Paper Field is required" });
        }
      } else {
        res.status(200).json({ message: "Semester Field is required" });
      }
    } else {
      res.status(200).json({ message: "Bs Program Field is required" });
    }
  } catch (error) {
    res.status(404).json({ message: "Something went wrong in server ", error });
  }
};

export const addLongQtn = async (req, res) => {
  const { lQuestion, paperDetails } = req.body;
  const { program, semester, paper } = paperDetails;
  try {
    if (program) {
      if (semester) {
        if (paper) {
          if (lQuestion) {
            const newQtn = new longQtnModel({
              lQuestion,
              paperDetails: {
                program:program._id,
                semester:semester._id,
                paper:paper,
              },
            });
            let shortqtn = await newQtn.save();
            if (shortqtn) {
              res
                .status(201)
                .json({ message: "Long Qtn Saved Successfully...", saved:true });
            }
          } else {
            res.status(200).json({ message: "Question Must be required" });
          }
        } else {
          res.status(200).json({ message: "Paper Field is required" });
        }
      } else {
        res.status(200).json({ message: "Semester Field is required" });
      }
    } else {
      res.status(200).json({ message: "Bs Program Field is required" });
    }
  } catch (error) {
    res.status(404).json({ message: "Something went wrong in server ", error });
  }
};

export const addMcqs = async (req, res) => {
  const { mcq, option1, option2, option3, option4, paperDetails } = req.body;
  const { program, semester, paper } = paperDetails;

  try {
    if (program) {
      if (semester) {
        if (paper) {
          if (mcq && option1 && option2 && option3 && paper) {
            const newMcq = new mcqsModel({
              mcq,
              option1,
              option2,
              option3,
              option4: option4 ? option4 : null,
              paperDetails: {
                program:program._id,
                semester:semester._id,
                paper,
              },
            });
            const savedMcq = await newMcq.save();
            if (savedMcq) {
              res.status(200).json({ message: "Mcq Saved Successfully...",saved:true });
            }
          } else {
            res
              .status(200)
              .json({ message: "Mcqs and Options Must be Required" });
          }
        } else {
          res.status(200).json({ message: "Paper is Required" });
        }
      } else {
        res.status(200).json({ message: "Semester Field is Required" });
      }
    } else {
      res.status(200).json({ message: "Program Field is Required" });
    }
  } catch (error) {
    res
      .status(404)
      .json({ message: "SomeThing went wrong", error: error.message });
  }
};


export const DeleteBsPaper=async(req,res)=>{
  const {id }=  req.params;
  try {
    const paper = await NewPaperModel.findByIdAndDelete(id);
       await shortQtnModel.deleteMany({"paperDetails.paper":id})

    res.status(200).json({msg:"Paper Deleted Successfully"})
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
} 