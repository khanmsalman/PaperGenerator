import styled from '@emotion/styled'
import { Button, MenuItem, Select, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react';
import { addMcqs, getPaper, getProgram, getSemester } from '../../services/Api';
import { useSelector } from 'react-redux';
import BackArrow from '../BackArrow';

const FeedMcqs = () => {
  const [message, setMessage] = useState(null)
  const [allPapers, setAllPapers] = useState([]);
  const [allSemesters, setAllSemesters] = useState([])
  const [allPrograms, setAllPrograms] = useState([])
  const [mcqs, setMcqs] = useState({
    mcq: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    paperDetails: {
      program: '',
      semester: '',
      paper: '',
    }
  })
  const mode = useSelector(state => state.mode.mode)
  const {subjects, superAdmin} = JSON.parse(localStorage.getItem("user"))

  useEffect(()=>{

    console.log(mcqs.paperDetails.semester)
  },[mcqs.paperDetails])

  
  const handleClick = async () => {
    const res = await addMcqs(mcqs);
    if (res.data) {
      setMessage(res.data)
    }
    setMcqs({ 
      ...mcqs,
      mcq: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
    })

    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }

  useEffect(() => {
    getAllPapers();
    getAllSemester()
    getAllPrograms()
  }, [])
  const getAllPapers = async () => {
    const res = await getPaper()
    setAllPapers(res.data.papers)
  }
  const getAllSemester = async () => {
    const res = await getSemester();
    setAllSemesters(res.data.semesters)
  }
  const getAllPrograms = async () => {
    const res = await getProgram();
    setAllPrograms(res.data.programs)
  }

  const handleReset = () => {
    setMcqs({
      mcq: '', option1: '',option2: '', option3: '', option4: '',
      paperDetails: {
        program: '', semester: '',  paper: ''
      }
    })
  }
  return (
    <div style={{ minHeight: "100vh", background: mode === 'light' ? '#eef8ff' : '', }}>
      <BackArrow />
      <h2 style={{ margin: '20px auto', fontWeight: '500', fontSize: '30px', width: '40%' }} >Feed MCQ's</h2>
      <Container sx={{ background: mode === 'dark' ? '#001e3c' : '#fff' }} className='w-[90%] sm:w-[70%] lg:w-1/2'>
        <div className='flex gap-4 flex-wrap sm:flex-nowrap  sm:justify-between mb-4 pl-0 -ml-3' >
          <Select color='secondary' style={{ width: "40%", marginLeft: "10px", background: '#fff' }} value={mcqs.paperDetails.program} name="program"
            onChange={(e) => setMcqs({ ...mcqs, paperDetails: { ...mcqs.paperDetails, [e.target.name]: e.target.value } })}>
            {
              allPrograms.map((programs) => (
                <MenuItem key={programs._id} value={programs}>{programs.program}</MenuItem>
              ))
            }
          </Select>
          <Select style={{ width: "40%", background: '#fff' }} value={mcqs.paperDetails.semester} name="semester"
            onChange={(e) =>setMcqs({ ...mcqs, paperDetails: { ...mcqs.paperDetails, [e.target.name]: e.target.value } })}>
            {
              allSemesters.map((semester) => (
                <MenuItem key={semester._id} value={semester}>{semester.semester}</MenuItem>
              ))
            }
          </Select>
          <Select style={{ width: "40%", background: '#fff' }} value={mcqs.paperDetails.paper} name="paper"
            onChange={(e) => setMcqs({ ...mcqs, paperDetails: { ...mcqs.paperDetails, [e.target.name]: e.target.value._id } })} >
            {
              allPapers && allPapers.filter((paper) => paper.semester === mcqs.paperDetails.semester._id && paper.program === mcqs.paperDetails.program._id).map((paper) => {
                const Check = subjects.length > 0 && subjects.find((sub) => sub === paper._id)
                return (
                  <MenuItem disabled={!(!!Check || superAdmin)} key={paper._id} value={paper}>{paper.newpaper}</MenuItem>
                )
              }
              ) 
            }
          </Select>
        </div>
        <div>
          <TextField style={{ width: '100%' }} value={mcqs.mcq} name="mcq" label="Enter Your Mcqs" onChange={(e) => setMcqs({ ...mcqs, [e.target.name]: e.target.value })} /> <br /><br />
          <TextField style={{ width: '100%' }} label="Option 1" name="option1" value={mcqs.option1} onChange={(e) => setMcqs({ ...mcqs, [e.target.name]: e.target.value })} /> <br /> <br />
          <TextField style={{ width: '100%' }} label="Option 2" name="option2" value={mcqs.option2} onChange={(e) => setMcqs({ ...mcqs, [e.target.name]: e.target.value })} /> <br /> <br />
          <TextField style={{ width: '100%' }} label="Option 3" name="option3" value={mcqs.option3} onChange={(e) => setMcqs({ ...mcqs, [e.target.name]: e.target.value })} /> <br /> <br />
          <TextField style={{ width: '100%' }} label="Option 4" name="option4" value={mcqs.option4} onChange={(e) => setMcqs({ ...mcqs, [e.target.name]: e.target.value })} /> <br /> <br />
          <button className='w-full p-2  text-white rounded-md bg-primary ' onClick={handleClick}>Submit Questions</button>
          <div className='mt-4 flex  items-center justify-between' >
            <button className='w-[48%] p-2 text-white rounded-md  bg-primary ' onClick={handleReset} >Reset</button>
            {
              message?.message &&
              <div className={` mx-auto p-[6px] font-semibold rounded-md border  transition-all ${message?.saved ? "text-green-500 border-green-500" : 'text-red-500 border-red-500'}`}>                {message?.message}
              </div>
            }
          </div>
        </div>
      </Container>
    </div>
  )
}

export default FeedMcqs;

const Container = styled(Box)`
  margin:10px auto;
  padding:15px;
  border-radius:15px;
  color:white;
  box-shadow:5px 5px 15px 5px rgb(191, 189, 189);
  margin-bottom:50px;

  & input{
    background:#fff;
  }
`