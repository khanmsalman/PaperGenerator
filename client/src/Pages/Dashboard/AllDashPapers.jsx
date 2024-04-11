import { DeleteForeverRounded, DeleteForeverSharp, } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import {toast} from 'react-hot-toast'
import { DeleteBsPaperById, getOverAllPapers, getProgram, getSemester } from '../../services/Api';


const AllDashPapers = () => {
    
    const [allPapers, setAllPapers] = useState([])
    const [bsPrograms, setBsPrograms] = useState('')
    const [semesters, setSemesters] = useState('')
    const [activeProgram, setActiveProgram] = useState();
    const [activeSem, setActiveSem] = useState('');
    
    
    useEffect(()=>{
        setActiveProgram(bsPrograms[0]?._id)
        setActiveSem(semesters[0]?._id)
    },[bsPrograms,semesters])

    useEffect(()=>{
        fetchAllPapers();
        getProgramAndSemester();
    },[])

    const getProgramAndSemester = async () => {
        const res = await getProgram();
        setBsPrograms(res.data.programs);
        const semtrs = await getSemester();
        setSemesters(semtrs.data.semesters)
      }
    const fetchAllPapers=async()=>{
        const res = await getOverAllPapers();
        setAllPapers(res.data);
        }

    // console.log(papers.filter((paper)=>((paper.semester._id===activeSem && paper.program._id===activeProgram) ?? paper.program._id===activeProgram)))

    // console.log(papers.filter((paper)=>paper.prog))

    const deleteBsPaper=async(paperId)=>{
        if(window.confirm("All Questions of This Paper Also Deleted")){
            const res  = await DeleteBsPaperById(paperId);
            if(res.data.msg){
                toast(res.data.msg)
            }
        }
        fetchAllPapers();
    }

  return (
    <div className='py-6 px-1 flex flex-col gap-7'>
        <div className="flex items-center justify-center gap-5 ">
        {
            bsPrograms && bsPrograms.map((program)=>(
                <div key={program._id} onClick={()=>setActiveProgram(program._id)} className={`px-4 cursor-pointer py-2 rounded-md  ${activeProgram===program._id?'bg-primary text-white':'bg-vmost-light text-dark'}`}>
                    {program.program} 
                </div>
            ))
        }
        </div>
        <div className="flex items-center justify-center gap-5">
        {
            semesters && semesters.map((semester)=>(
                <div key={semester._id} onClick={()=>setActiveSem(semester._id)} className={` px-4 cursor-pointer py-2 rounded-md  ${activeSem===semester._id?'bg-primary text-white':'bg-vmost-light text-dark'}`}>
                    {semester.semester} 
                </div>
            ))
        }
        </div>
        <div className="border-b"/>
        <div className="flex items-center justify-start gap-3 flex-wrap">
            {
                allPapers && allPapers.filter((paper)=>(paper.semester===activeSem && paper.program===activeProgram) ?? paper.program===activeProgram).map((paper)=>(
                    <div key={paper._id} className="pl-4 pr-2 py-1 flex gap-2 items-center rounded-md bg-vmost-light text-most-dark">
                        {paper.newpaper}
                        <span onClick={()=>deleteBsPaper(paper._id)} className='cursor-pointer hover:bg-purple-400/50 transition-all duration-300 rounded-full p-2'>
                        <DeleteForeverRounded/>
                        </span>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default AllDashPapers