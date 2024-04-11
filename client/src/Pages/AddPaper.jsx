import styled from '@emotion/styled'
import { Button, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { addPaper, getPaper, getProgram, getSemester } from '../services/Api'
import { useSelector } from 'react-redux'
import BackArrow from '../components/BackArrow'
import { Link } from 'react-router-dom'


export default function AddPaperDetails() {
  const [paper, setPaper] = useState({ paper: '', program: '', semester: '' })
  const [allPapers, setAllPapers] = useState([]);
  const [allprograms, setAllprograms] = useState([]);
  const [allSemesters, setAllSemesters] = useState([]);
  const mode = useSelector((state) => state.mode.mode)

  useEffect(() => {
    getAllPapers();
    getAllPrograms();
    getAllSemesters();
  }, [])

  const getAllPapers = async () => {
    const response = await getPaper();
    setAllPapers(response.data.papers)
  }
  const getAllPrograms = async () => {
    const res = await getProgram();
    setAllprograms(res.data.programs)
  }
  const getAllSemesters = async () => {
    const res = await getSemester();
    setAllSemesters(res.data.semesters)
  }

  const handlePaper = async (e) => {
    e.preventDefault();
    const res = await addPaper(paper);
    setPaper({ ...paper, paper: '' });
    getAllPapers()
  }

  const handleChange = (e) => {
    setPaper({ ...paper, [e.target.name]: e.target.value })
  }
  return (                                                                                                 
    <div className='flex flex-col items-center justify-start flex-wrap relative px-10 pt-12 min-h-[90vh]' style={{ background: mode === 'light' ? '#eef8ff' : '', position: 'relative' }}>
      <div className='absolute top-0 left-0'>
        <BackArrow />
      </div>
      <div className='w-full mx-auto sm:w-4/5 lg:w-1/2'>
        <h2 style={{ margin: '10px auto', fontWeight: '500', fontSize: '30px', marginBottom: '-10px', width: '40%' }} >Add Paper</h2>
        <div className='w-full my-5 mx-auto shadow-2xl p-4 rounded-2xl'>
          <form onSubmit={handlePaper} >
            <TextField label="Enter Paper" className='w-full bg-white' name="paper" onChange={(e) => handleChange(e)} value={paper.paper} /><br /><br />
            <div className="flex items-end justify-between ">
              <button className='bg-primary text-white px-5 py-3 mb-1.5 text-lg rounded-lg ' type="submit">Add Paper</button>

              <div className='w-1/3 flex flex-col justify-center items-center'>
                <p className='text-base text-gray-500'>Select programs</p>
                <Select name="program" onChange={(e) => handleChange(e)} className='w-full'>
                  {allprograms && allprograms.map((program, i) => (
                    <MenuItem key={i} value={program._id}>{program.program}</MenuItem>
                  ))}
                </Select>
              </div>

              <div className='w-1/3  flex flex-col justify-center items-center'>
                <p className='text-base text-gray-500'>Select semester</p>
                <Select name="semester" onChange={(e) => { setPaper({ ...paper, [e.target.name]: e.target.value }) }} className='w-full'>
                  {allSemesters && allSemesters.map((semester, i) => (
                    <MenuItem key={i} value={semester._id}>{semester.semester}</MenuItem>
                  ))}
                </Select>
              </div>
            </div>

          </form>
        </div>
      </div>

    </div>
  )
}

