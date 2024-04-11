import styled from '@emotion/styled';
import { Alert, AlertTitle, Button, Table, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getProgram, addProgram } from '../services/Api';
import { BackArrow } from '../components';

export default function AddProgram() {
  const [program, setProgram] = useState({ program: '' })
  const [programs, setPrograms] = useState([])
  const [error, setError] = useState({
    status: false,
    msg: '',
    type: ''
  })

  const mode = useSelector(state => state.mode.mode)

  useEffect(() => {
    allPrograms()
  }, [program]) 

  const allPrograms = async () => {
    const res = await getProgram()
    setPrograms(res.data.programs)
  }

  const handleProgram = async (e) => {
    e.preventDefault();
    console.log(program)
    const res = await addProgram(program)
    if (res.data.status === 'warning') {
      setError({ status: true, msg: res.data.message, type: 'warning' })
    }
    if (res.data.status === 'success') {
      setError({ status: true, msg: res.data.message, type: 'success' })
    }
    setProgram({ program: '' })
  }

  return (
    <MuiBox style={{ background: mode === 'light' ? '#eef8ff' : '',position:'relative'}}>
      <div style={{position:'absolute',top:0,left:0}}>
        <BackArrow />
      </div>
      <div style={{ width: '100%', maxWidth: '48%'}} >
        <h2 style={{ margin: '10px auto', fontWeight: '500', fontSize: '30px', marginBottom: '-10px', width: '40%' }} >Add Program</h2>
        <Containr style={{ background: mode === 'light' ? '#fff' : '' }} >
          <form onSubmit={handleProgram}>
            <TxtField label="Enter BS Program" name="program" style={{ color: mode === 'dark' ? '#fff' : 'black' }} onChange={(e) => { setProgram({ program: e.target.value.toUpperCase() }) }} value={program.program} /><br /><br />
            <Button onClick={handleProgram} variant="contained" color="secondary" size="medium" >Add BS Program</Button>
          </form>
        </Containr>
        {
          error.status === true ?
            <Alert className="alrt" severity={error.type} >
              <AlertTitle>{error.type}</AlertTitle>
              {error.msg}
            </Alert> :
            ''
        }
      </div>

      <div style={{ width: '100%', maxWidth: '50%' }}>
        <h2 style={{ margin: '10px auto', fontWeight: '500', fontSize: '30px', marginBottom: '-10px', width: '40%' }} >Add Program</h2>
        <Containr style={{ background: mode === 'light' ? '#fff' : '' }}>
          <List>
            {
              programs.map((program) => (
                <>
                  <li style={{ margin: '15px 0px 5px', color: mode === 'dark' ? '#fff' : 'black' }}>{program.program}</li>
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
  box-shadow:5px 5px 10px 5px #c5c5c5ad;
  border-radius:15px;

  & .MuiFormLabel-root{
    // color:#92c8ff;
    color:gray;
  }
`

const TxtField = styled(TextField)`
  width:100%;
  background:white;
  border-radius:5px;
`
const List = styled('ul')({
  fontSize: '25px',
  fontFamily: 'sans-serif',
  listStyle: 'none',
})


const MuiBox = styled(Box)`
 display:flex;
 justify-content:space-between;
 flex-wrap:wrap;
 padding-top:2rem;
 height:90vh;
`