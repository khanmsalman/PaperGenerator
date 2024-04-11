import { useEffect, useState } from 'react'
import moment from 'moment/moment'
import { MenuItem, Select } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getProgram, getSemester } from '../services/Api'
import { allPapers } from '../RTK/Slices/PaperSlice'
import LockPaper from '../components/Lockpaper/LockPaper';
import { lockPaperById } from '../RTK/Slices/PaperSlice'
import { UnLockPaper } from '../components/unLockPaper/UnLockPaper'


export default function AllPapers() {
  // custom variable
  const [allPrograms, setAllPrograms] = useState(null);
  const [allSemesters, setAllSemesters] = useState(null);

  const [loginSelectBs, setLoginSelectBs] = useState(null)
  const [otherSelectBs, setOtherSelectBs] = useState(null)
  const [loginSelectSemester, setLoginSelectSemester] = useState(null)
  const [otherSelectSemester, setOtherSelectSemester] = useState(null)

  // redux variable 
  const { loading, loginsPapers, Papers, error } = useSelector(state => ({ ...state.papers }))
  // let { loginsPapers, Papers, user } = papers ? papers : { loginsPapers: '', Papers: '', user: '' };
  const mode = useSelector(state => state.mode.mode)
  const user = JSON.parse(localStorage.getItem("user"))
  const id = loginsPapers && loginsPapers[0]?.creator?.id

  
  const navigate = useNavigate()
  const dispatch = useDispatch();

  let otherPapers = Papers && Papers.filter((paper) => paper.creator.id !== id)

  const [filterPapers, setFilterPaper] = useState([])
  const [otherFilterPapers, setOtherFilterPapers] = useState([])
  

  useEffect(() => {
    if (loginSelectBs && loginSelectSemester) {
      let updatePapers = loginsPapers.filter((paper) => {
        return paper.pdetails.program.program === loginSelectBs && paper.pdetails.semester.semester === loginSelectSemester
      })
      setFilterPaper(updatePapers)
    }
  }, [loginsPapers, loginSelectBs, loginSelectSemester])

console.log(loginSelectBs)
console.log(loginSelectSemester)

console.log(loginsPapers)
  // useEffect(() => {
  //   if (otherSelectBs && otherSelectSemester) {
  //     let updateOtherPapers = otherPapers && otherPapers.filter((paper) => {
  // return paper.pdetails.program === loginSelectBs && paper.pdetails.semester === loginSelectSemester
  //     })
  //     setOtherFilterPapers(updateOtherPapers)
  //   }
  // }, [otherPapers, otherSelectBs, otherSelectSemester])


  useEffect(() => {
    dispatch(allPapers())
    getAllPrograms();
    getAllSemesters();
  }, [])


  const getAllPrograms = async () => {
    const res = await getProgram();
    setAllPrograms(res.data.programs)
  }
  const getAllSemesters = async () => {
    const res = await getSemester();
    setAllSemesters(res.data.semesters)
  }

  const handleClick = async (id) => {
    navigate(`/fullpaper2/${id}`)
  }

  const handlePaperLock = async (paperId) => {
    dispatch(lockPaperById(paperId))
  }

  console.log(filterPapers)


  if (loading) {
    return <h1 className='h-screen p-20 text-5xl font-bold'>Loading....</h1>
  }

  return (
    <div className={`min-h-[90vh] p-3 ${mode === 'light' ? 'bg-bgColor' : ''}`} >
      <div className="w-full  p-3 min-h-[70vh] mb-3 ">

        <div className='flex items-center justify-between pr-10'>
          <h1 className='text-3xl text-[#9400d3] ' >Your Generated Papers</h1>

          <div className='flex gap-2 items-center justify-center'>
            <Select onChange={(e) => setLoginSelectBs(e.target.value.program)} className='w-40 shadow-2xl bg-white text-[#8f2cba] border-none' >
              {
                allPrograms && allPrograms.map((program) => (
                  <MenuItem key={program.program._id} value={program}>{program.program}</MenuItem>
                ))
              }
            </Select>
            <Select onChange={(e) => setLoginSelectSemester(e.target.value.semester)} disabled={!loginSelectBs} className='w-40 shadow-2xl bg-white text-[#8f2cba] border-none' >
              {
                allSemesters && allSemesters.map((semester) => (
                  <MenuItem key={semester.semester._id} className='w-40' value={semester}>{semester.semester}</MenuItem>
                ))
              }
            </Select>

          </div>
        </div>
        <div className="gridForAllPaper w-full py-10 gap-7 ">
          {
            (!loginSelectBs || !loginSelectSemester) &&
              (loginsPapers && loginsPapers.length !== 0) ?
              (loginsPapers.map((paper) => (
                <div key={paper._id} className={`relative cursor-pointer pb-5 shadow-2xl rounded-2xl`}>
                  <div onClick={() => handleClick(paper._id)}>
                    <div className={`bg-[#5d009b] flex justify-between items-center gap-5 h-14 px-3 rounded-lg ${mode === 'dark' ? 'text-white' : ''}`} >
                      <p className={`text-gray-100 text-base`}> {paper?.creator?.name} </p>
                      <p style={{ marginRight: '20px', color: '#dadada', fontSize: '16px', fontFamily: 'Segoe UI' }}>{moment(paper.createdAt).fromNow()}</p>
                    </div>
                    <div className="flex flex-col items-start justify-center p-5">
                      
                      {/* <p>{paper}</p> */}
                      <p className='text-lg text-left text-gray-500'>Paper : {paper?.pdetails?.paper.newpaper}</p>
                      <p className='text-lg text-gray-500'>{paper?.pdetails?.semester?.semester} Semester,</p>
                      <p className='text-lg text-gray-500'>{paper?.pdetails?.program.program}</p>
                    </div>
                  </div>
                  {
                    paper.isLock ? <div title='Paper Locked By Admin' className='absolute rounded-lg top-0 left-0 w-full h-full bg-primary/25'></div> : ''
                  }
                  {
                    user && user.superAdmin ?
                      <div onClick={() => handlePaperLock(paper._id)}>
                        {
                          paper.isLock ?
                            <UnLockPaper id={paper._id} />
                            :
                            <LockPaper id={paper._id} />
                        }
                      </div>
                      : ''
                  }
                </div>
              ))
              ) :
              !!loginSelectBs && !!loginSelectSemester &&
              filterPapers && filterPapers.map((paper) => (
                <div key={paper._id} className={`relative pb-5 cursor-pointer shadow-2xl rounded-2xl`}>
                  <div onClick={() => handleClick(paper._id)}>
                    <div className={`bg-[#5d009b] flex justify-between items-center gap-5 h-14 px-3 rounded-lg ${mode === 'dark' ? 'text-white' : ''}`} >
                      <p className={`text-gray-100 text-base`}> {paper?.creator?.name} </p>
                      <p style={{ marginRight: '20px', color: '#dadada', fontSize: '16px', fontFamily: 'Segoe UI' }}>{moment(paper.createdAt).fromNow()}</p>
                    </div>
                    <div className="flex flex-col items-start justify-center p-5">

                      <p className='text-lg text-left text-gray-500'>Paper : {paper?.pdetails?.paper.newpaper}</p>
                      <p className='text-lg text-gray-500'>{paper?.pdetails?.semester?.semester} Semester,</p>
                      <p className='text-lg text-gray-500'>{paper?.pdetails?.program?.program}</p>
                    </div>
                  </div>
                  {
                    paper.isLock ? <div title='Paper Locked By Admin' className='absolute rounded-lg top-0 left-0 w-full h-full bg-primary/25'></div> : ''
                  }
                  {
                    user && user.superAdmin ?
                      <div onClick={() => handlePaperLock(paper._id)}>
                        {
                          paper.isLock ?
                            <UnLockPaper id={paper._id} />
                            :
                            <LockPaper id={paper._id} />
                        }
                      </div>
                      : ''
                  }
                </div>
              ))

          }
          {
            !loginSelectBs || !loginSelectSemester ? !loginsPapers?.length > 0 && (<h1 className='text-4xl font-sans font-semibold text-gray-400'>No Papers Available</h1>)
              :
              !filterPapers.length > 0 && <h1 className='text-4xl font-sans font-semibold text-gray-400'>No Papers Available</h1>
          }
        </div>
      </div>
      {
        user.superAdmin ?
          <div className="w-full p-3 min-h-[80vh] ">

            <div className='flex items-center justify-between pr-10'>
              <h1 className='text-3xl text-[#9400d3] ' >Other Users Generated Papers</h1>
              <div className='flex gap-2 items-center justify-center'>

                <Select onChange={(e) => setOtherSelectBs(e.target.value.program)} className='w-40 shadow-2xl bg-white text-[#8f2cba] border-none' >
                  {
                    allPrograms && allPrograms.map((program) => (
                      <MenuItem key={program.program._id} value={program}>{program.program}</MenuItem>
                    ))
                  }
                </Select>
                <Select disabled={!otherSelectBs} onChange={(e) => setOtherSelectSemester(e.target.value.semester)} className='w-40 shadow-2xl bg-white text-[#8f2cba] border-none' >
                  {
                    allSemesters && allSemesters.map((semester) => (
                      <MenuItem className='w-40' key={semester.semester._id} value={semester}>{semester.semester}</MenuItem>
                    ))
                  }
                </Select>
              </div>
            </div>


            <div className="gridForAllPaper   py-10  gap-7 px-5">
              {
                (!otherSelectBs || !otherSelectSemester) && otherPapers && otherPapers.length !== 0 ? otherPapers.map((paper) => (
                  <div key={paper._id} className={`relative cursor-pointer pb-5 shadow-2xl rounded-2xl`}>
                    <div onClick={() => handleClick(paper._id)}>
                      <div className={`bg-[#5d009b] flex justify-between items-center gap-5 h-14 px-3 rounded-lg ${mode === 'dark' ? 'text-white' : ''}`} >
                        <p className={`text-gray-100 text-base`}> {paper?.creator?.name} </p>
                        <p style={{ marginRight: '20px', color: '#dadada', fontSize: '16px', fontFamily: 'Segoe UI' }}>{moment(paper.createdAt).fromNow()}</p>
                      </div>
                      <div className="flex flex-col items-start justify-center p-5">
                        <p className='text-lg text-left text-gray-500'>Paper : {paper?.pdetails?.paper.newpaper}</p>
                        <p className='text-lg text-gray-500'>{paper?.pdetails?.semester.semester} Semester,</p>
                        <p className='text-lg text-gray-500'>{paper?.pdetails?.program.program}</p>
                      </div>
                    </div>
                    {
                      paper.isLock ? <div title='Paper Locked By Admin' className='absolute top-0 left-0 w-full h-full rounded-md bg-primary/25'></div> : ''
                    }
                    {
                      user && user.superAdmin ?
                        <div onClick={() => handlePaperLock(paper._id)}>
                          {
                            paper.isLock ?
                              <UnLockPaper id={paper._id} />
                              :
                              <LockPaper id={paper._id} />
                          }
                        </div>
                        : ''
                    }
                  </div>
                )) :
                  !!otherSelectBs && !!otherSelectSemester && otherPapers && otherPapers.filter(paper => {
                    return paper.pdetails.program.program === otherSelectBs && paper.pdetails.semester.semester === otherSelectSemester
                  }).map((paper) => (
                    <div key={paper._id} className={`relative cursor-pointer pb-5 shadow-2xl rounded-2xl`}>
                      <div onClick={() => handleClick(paper._id)}>
                        <div className={`bg-[#5d009b] flex justify-between items-center gap-5 h-14 px-3 rounded-lg ${mode === 'dark' ? 'text-white' : ''}`} >
                          <p className={`text-gray-100 text-base`}> {paper?.creator?.name} </p>
                          <p style={{ marginRight: '20px', color: '#dadada', fontSize: '16px', fontFamily: 'Segoe UI' }}>{moment(paper.createdAt).fromNow()}</p>
                        </div> 
                        <div className="flex flex-col items-start justify-center p-5">

                          <p className='text-lg text-left text-gray-500'>Paper : {paper?.pdetails?.paper.newpaper}</p>
                          <p className='text-lg text-gray-500'>{paper?.pdetails?.semester.semester} Semester,</p>
                          <p className='text-lg text-gray-500'>{paper?.pdetails?.program.program}</p>
                        </div>
                      </div>
                      {
                        paper.isLock ? <div title='Paper Locked By Admin' className='absolute rounded-lg top-0 left-0 w-full h-full bg-primary/25'></div> : ''
                      }
                      {
                        user && user.superAdmin ?
                          <div onClick={() => handlePaperLock(paper._id)}>
                            {
                              paper.isLock ?
                                <UnLockPaper id={paper._id} />
                                :
                                <LockPaper id={paper._id} />
                            }
                          </div>
                          : ''
                      }
                    </div>
                  ))
              }
              {
                !otherSelectBs || !otherSelectSemester ? !otherPapers?.length > 0 && (<h1 className='text-4xl font-sans font-semibold text-gray-400'>No Papers Available</h1>)
                  :
                  !otherPapers.filter((paper) => paper.pdetails.program.program === otherSelectBs && paper.pdetails.semester.semester === otherSelectSemester
                  ).length > 0 && <h1 className='text-4xl font-sans font-semibold text-gray-400'>No Papers Available</h1>
              }
            </div>
          </div>
          :
          ''
      }
    </div>
  )
}