import styled from '@emotion/styled'
import { Button, Fab, MenuItem, Select, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { addShortQtn, getNumofQtn, getPaper } from '../../services/Api'
import { getSemester } from '../../services/Api'
import { getProgram } from '../../services/Api'
import { useSelector } from 'react-redux'
import BackArrow from '../BackArrow'

export default function FeedShortQtn() {
  const [message, setMessage] = useState(null)
  const [allPapers, setAllPapers] = useState([]);
  const [allSemesters, setAllSemesters] = useState([])
  const [allPrograms, setAllPrograms] = useState([])
  const [numOfQtn, setNumOfQtn] = useState({ program: '', semester: '', paper: '', Qtn: '' })
  const [shortQtn, setShortQtn] = useState({
    sQuestion: '',
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
    const res = await addShortQtn(shortQtn);
    if (res.data) {
      setMessage(res.data)
    }
    setShortQtn({ ...shortQtn, sQuestion: '' })

    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }
  const handleReset = () => {
    setShortQtn({ sQuestion: '', paperDetails: { paper: '', program: '', semester: '' } })
  }

  //  var arr =  [
  //   {
  //     paperDetails: {
  //       program: '6507c9dad291527b8ac1edd3',
  //       semester: '642bac71c65f4670ab33d11b',
  //       paper: '655ea5e338b8b467d12e7f91'
  //     },
  //     _id:"65968b1f15cb9af3a9f32ee1",
  //     sQuestion: 'is ChatGpt replace programmers ?',
  //     __v: 0
  //   },
  //   {
  //     paperDetails: {
  //       program: '6507c9dad291527b8ac1edd3',
  //       semester: '642bac71c65f4670ab33d11b',
  //       paper: '655ea5e338b8b467d12e7f91'
  //     },
  //     _id:"65968b2115cb9af3a9f32ee4",
  //     sQuestion: 'which the popular noSql database ?',
  //     __v: 0
  //   },
  //   {
  //     paperDetails: {
  //       program: '6507c9dad291527b8ac1edd3',
  //       semester: '642bac71c65f4670ab33d11b',
  //       paper: '655ea5e338b8b467d12e7f91'
  //     },
  //     _id: "65968b2d15cb9af3a9f32ee7",
  //     sQuestion: 'what is front-end?',
  //     __v: 0
  //   },
  //   {
  //     paperDetails: {
  //       program: '6507c9dad291527b8ac1edd3',
  //       semester: '642bac71c65f4670ab33d11b',
  //       paper: '655ea5e338b8b467d12e7f91'
  //     },
  //     _id: "65968b3515cb9af3a9f32eea",
  //     sQuestion: 'what is html?',
  //     __v: 0
  //   },
  //   {
  //     paperDetails: {
  //       program: '6507c9dad291527b8ac1edd3',
  //       semester: '642bac71c65f4670ab33d11b',
  //       paper: '655ea5e338b8b467d12e7f91'
  //     },
  //     _id: "65968b3d15cb9af3a9f32eed",
  //     sQuestion: 'what is css',
  //     __v: 0
  //   },
  //   {
  //     paperDetails: {
  //       program: '6507c9dad291527b8ac1edd3',
  //       semester: '642bac71c65f4670ab33d11b',
  //       paper: '655ea5e338b8b467d12e7f91'
  //     },
  //     _id: "65968b4a15cb9af3a9f32ef0",
  //     sQuestion: 'define function parameters?',
  //     __v: 0
  //   }
  // ]
  // let value =  {
  //   paperDetails: {
  //     program: '6507c9dad291527b8ac1edd3',
  //     semester: '642bac71c65f4670ab33d11b',
  //     paper: '655ea5e338b8b467d12e7f91'
  //   },
  //   _id: "65968b4a15cb9af3a9f32ef0",
  //   sQuestion: 'define function parameters?',
  //   __v: 0
  // }
  
  // const ans = arr.find(myFunction)

  // function myFunction(qtn, index, array) {
  //   return JSON.stringify(qtn) ==JSON.stringify(value);
  // }
  // console.log(ans)
  // // console.log(ans)
  
  return (
    <div style={{ background: mode === 'light' ? '#eef8ff' : '' }} className='h-[90vh]'>
      <BackArrow />
      <h2 style={{ margin: '10px auto', fontWeight: '500', fontSize: '30px', marginBottom: '-10px', width: '40%' }} >Feed Short Questions</h2>
      <Container sx={{ background: mode === 'dark' ? '#001e3c' : '#fff' }} className='shadow-2xl drop-shadow-sm'>
        <div>
          <div className='flex justify-between mb-4 pl-0 -ml-3' >
            <Select style={{ width: "40%", marginLeft: "10px", background: '#fff' }} value={shortQtn.paperDetails.program} name="program"
              onChange={(e) => setShortQtn({ ...shortQtn, paperDetails: { ...shortQtn.paperDetails, [e.target.name]: e.target.value } })}>
              {
                allPrograms.map((programs) => (
                  <MenuItem value={programs}>{programs.program}</MenuItem>
                ))
              }
            </Select>
            <Select style={{ width: "40%", marginLeft: "10px", background: '#fff' }} value={shortQtn.paperDetails.semester} name="semester"
              onChange={(e) => setShortQtn({ ...shortQtn, paperDetails: { ...shortQtn.paperDetails, [e.target.name]: e.target.value } })} >
              {
                allSemesters && allSemesters.map((semester) => (
                  <MenuItem value={semester}>{semester.semester}</MenuItem>
                ))
              }
            </Select>
            <Select style={{ width: "40%", marginLeft: "10px", background: '#fff' }} value={shortQtn.paperDetails.paper} name="paper"
              onChange={(e) => setShortQtn(
                {
                  ...shortQtn,
                  paperDetails:
                  {
                    ...shortQtn.paperDetails,
                    [e.target.name]: e.target.value
                  }
                })
                } >
              {
                allPapers && allPapers.filter((paper) => paper.semester === shortQtn.paperDetails.semester._id && paper.program === shortQtn.paperDetails.program._id).map((paper) => {
                  const Check = subjects.length > 0 && subjects.find((sub) => sub === paper._id)
                  return (
                    <MenuItem disabled={!(!!Check || superAdmin)} value={paper}>{paper.newpaper}</MenuItem>
                  )
                })
              }
            </Select>
          </div>
          {/* {
            tfValue.map((value)=>(
              <> */}
          <TextField style={{ width: '100%', background: '#fff' }} name="sQuestion" value={shortQtn.sQuestion} onChange={(e) => setShortQtn({ ...shortQtn, sQuestion: e.target.value })} label="Enter Question" />
          {/* </>
              ))
          } */}
          <div className='mt-5 flex gap-4' id='shortQtn-btn'>
            <button className='w-[180px] p-2 text-white rounded-md bg-primary ' onClick={handleClick}>Submit Questions</button>
            <button className='w-[180px]  p-2 text-white rounded-md  bg-primary ' onClick={handleReset} >Reset</button>
            {
              message?.message &&
              <div className={` mx-auto p-[6px] font-semibold rounded-md border  transition-all ${message?.saved ? "text-green-500 border-green-400" : 'text-red-500 border-red-400'}`}>
                {message?.message}
              </div>
            }
          </div>
        </div>
      </Container >
    </div >
  )
}


const Container = styled(Box)`
  width:70%;
  margin:20px auto;
  padding:15px;
  border-radius:15px;
`
