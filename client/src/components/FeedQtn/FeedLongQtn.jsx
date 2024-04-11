import styled from '@emotion/styled'
import { Button, Box, MenuItem, Select, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { addLongQtn, getPaper, getSemester, getProgram } from '../../services/Api'
import AddIcon from '@mui/icons-material/Add'
import { useSelector } from 'react-redux'
import BackArrow from '../BackArrow'

export default function FeedLongQtn() {
  const [message, setMessage] = useState(null)
  const [allPapers, setAllPapers] = useState([]);
  const [allSemesters, setAllSemesters] = useState([])
  const [allPrograms, setAllPrograms] = useState([])
  const [longQtn, setLongQtn] = useState({
    lQuestion: '',
    paperDetails: {
      program: '',
      semester: '',
      paper: '',
    }
  })
  const mode = useSelector(state => state.mode.mode)
  const { subjects, superAdmin } = JSON.parse(localStorage.getItem("user"))


  
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

  const handleClick = async () => {
    
    const res = await addLongQtn(longQtn);
    if (res.data) {
      setMessage(res.data)
    }
    setLongQtn({ ...longQtn, lQuestion: '' })
    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }
  const handleReset = () => {
    setLongQtn({ sQuestion: '', paperDetails: { paper: '', program: '', semester: '' } })
  }


  console.log(longQtn)
  return (
    <div style={{ background: mode === 'light' ? '#eef8ff' : '' }} className='h-[90vh]'>
      <BackArrow />
      <h2 style={{ margin: '30px auto', fontWeight: '500', fontSize: '30px', width: '40%' }} >Feed Long Questions</h2>
      <Container sx={{ background: mode === 'dark' ? '#001e3c' : '#fff' }} className='shadow-2xl'>
        <div>

          <div className='flex justify-between mb-4 pl-0 -ml-3'>
            <Select style={{ width: "40%", marginLeft: "10px", background: '#fff' }} name="program"
              onChange={(e) => setLongQtn({ ...longQtn, paperDetails: { ...longQtn.paperDetails, [e.target.name]: e.target.value } })}>
              {
                allPrograms.map((programs) => (
                  <MenuItem value={programs}>{programs.program}</MenuItem>
                ))
              }
            </Select>
            <Select style={{ width: "40%", marginLeft: "10px", background: '#fff' }}  name="semester"
              onChange={(e) => setLongQtn({ ...longQtn, paperDetails: { ...longQtn.paperDetails, [e.target.name]: e.target.value } })} >
              {
                allSemesters.map((semester) => (
                  <MenuItem value={semester}>{semester.semester}</MenuItem>
                ))
              }
            </Select>
            <Select style={{ width: "40%", marginLeft: "10px", background: '#fff' }}  name="paper"
              onChange={(e) => setLongQtn({ ...longQtn, paperDetails: { ...longQtn.paperDetails, [e.target.name]: e.target.value._id } })} >
              {
                allPapers && allPapers.filter((paper)=>paper.semester === longQtn.paperDetails.semester._id && paper.program === longQtn.paperDetails.program._id).map((paper) => {
                  const Check = subjects.length > 0 && subjects.find((sub) => sub === paper._id)

                 return <MenuItem disabled={!(!!Check || superAdmin)} value={paper}>{paper.newpaper}</MenuItem>
                })
              }
            </Select>
          </div>

          <TextField style={{ width: '100%', background: '#fff' }} name="sQuestion" value={longQtn.lQuestion} onChange={(e) => setLongQtn({ ...longQtn, lQuestion: e.target.value })} label="Enter Question" />



          <div className='mt-5 flex gap-4' id='shortQtn-btn'>
            <button className='w-[180px] p-2 text-white rounded-md bg-primary ' onClick={handleClick}>Submit Questions</button>
            <button className='w-[180px]  p-2 text-white rounded-md  bg-primary ' onClick={handleReset} >Reset</button>
            {
              message?.message &&
              <div className={` mx-auto p-[6px] font-semibold rounded-md border  transition-all ${message?.saved ? "text-green-500 border-green-500" : 'text-red-500 border-red-500'}`}>
                {message?.message}
              </div>
            }
          </div>
        </div>
      </Container>
    </div>
  )
}



const Container = styled(Box)`
  width:70%;
  margin:20px auto;
  padding:15px;
  border-radius:15px;
`


