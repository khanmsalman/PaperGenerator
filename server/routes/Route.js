import express from 'express';
const router = express.Router()
import { gentPaper, getGentPaper, getAllPapers, NumOfPaper, deletePaperById, lockPaper, getOverallPapers } from '../controller/GenController.js';
import { addPaper, getPapers, addProgram, addSemester, getProgram, getSemester, addShortQtn, addLongQtn, addMcqs, DeleteBsPaper } from '../controller/PaperDetlController.js';
import { signupUser, loginUser, getAllUsers, updateAdmin, AddSubjectToUser, deleteUserSubject, deleteUserById } from '../controller/AuthController.js';
import IsUserAuthenticated from '../middlewares/AuthMiddleware.js';

// generate paper
router.post('/genpaper', IsUserAuthenticated, gentPaper)
router.get('/getgenpaper/:id', IsUserAuthenticated, getGentPaper)
router.get('/getallpapers', IsUserAuthenticated, getAllPapers)
router.post('/getnumofqtn', IsUserAuthenticated, NumOfPaper)
router.delete('/deletebyid/:id', deletePaperById)
router.get('/getallBspapers',IsUserAuthenticated, getOverallPapers)

// paper detail routes
router.post('/addprogram', IsUserAuthenticated, addProgram)
router.get('/getprogram', IsUserAuthenticated, getProgram)
router.post('/addsemester', IsUserAuthenticated, addSemester)
router.get('/getsemester', IsUserAuthenticated, getSemester)
router.post('/addpaper', IsUserAuthenticated, addPaper)
router.get('/getpaper', IsUserAuthenticated, getPapers)
router.put('/lockpaper/:id', IsUserAuthenticated, lockPaper)
router.delete('/deletebspaper/:id',DeleteBsPaper)

// Question and mcq's
router.post("/addshortqtn", IsUserAuthenticated, addShortQtn)
router.post("/addlongqtn", IsUserAuthenticated, addLongQtn)
router.post("/addmcqs", IsUserAuthenticated, addMcqs)

//user register routes
router.post('/login', loginUser)
router.post('/signup', signupUser),
router.get('/getusers', IsUserAuthenticated,getAllUsers)
router.put('/updateadmin/:id',IsUserAuthenticated, updateAdmin)
router.put('/addusersubject', IsUserAuthenticated,AddSubjectToUser)
router.post('/deletesubject',IsUserAuthenticated,deleteUserSubject)
router.delete('/deleteuserbyid/:id',deleteUserById)

export default router; 