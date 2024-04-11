import styled from '@emotion/styled';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { all } from 'axios';
import React, { useEffect, useState } from 'react'
import { getProgram, addSemester, getSemester } from '../services/Api';
import { useSelector } from 'react-redux';
import BackArrow from '../components/BackArrow';


export default function AddSemester() {
  const [semester, setSemester] = useState({ semester: '' })
  const [allSemesters, setAllSemesters] = useState([])
  const mode = useSelector(state => state.mode.mode)

  useEffect(() => {
    getSem()
  }, [semester.semester])

  const getSem = async () => {
    const res = await getSemester();
    setAllSemesters(res.data.semesters)
  }
  const handleSemester = async (e) => {
    e.preventDefault();
    const res = await addSemester(semester)
    setSemester({ semester: '' })
  }
  return (
    <MuiBox style={{background: mode === 'light' ? '#eef8ff' : '', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        <BackArrow />
      </div>
      <div>
        <h2 style={{ margin: '10px auto', fontWeight: '500', fontSize: '30px', marginBottom: '-10px', width: '40%' }} >Add Semester</h2>
        <Containr sx={{ background: mode === 'light' ? '#fff' : '' }}>
          <form onSubmit={handleSemester}>
            <TxtField label="Enter Semester" style={{ background: '#fff' }} name="semester" onChange={(e) => { setSemester({ ...semester, [e.target.name]: e.target.value }) }} value={semester.semester} /><br /><br />
            <Button type="submit" variant="contained" color="secondary" size="medium" >Add Semester</Button>
          </form>
        </Containr>
      </div>
      <div style={{ width: '100%' }}>
        <h2 style={{ margin: '10px auto', fontWeight: '500', fontSize: '30px', marginBottom: '-10px', width: '40%' }} >All Semesters</h2>
        <Containr sx={{ background: mode === 'light' ? '#fff' : '' }} >
          <List>
            {
              allSemesters.map((semester) => (
                <>
                  <li style={{ margin: '15px 0px 5px' }}>{semester.semester} <span style={{ float: "right", color: "gray" }}>{semester.program}</span></li>
                  <hr />
                </>
              ))
            }
          </List>
        </Containr>
      </div>
    </MuiBox>
  )
}


const Containr = styled(Box)`
  width:80%;
  margin:20px auto;
  padding:15px;
  border-radius:15px;
  box-shadow:5px 5px 15px 5px rgb(191, 189, 189);
`
const TxtField = styled(TextField)`
  width:100%;
`

const List = styled('ul')({
  fontSize: '25px',
  fontFamily: 'sans-serif',
  listStyle: 'none',
})

const MuiBox = styled(Box)`
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(400px,1fr));
  justify-content:stretch;
  padding-top:3rem;
`