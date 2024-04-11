import { Box, Button, styled } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

export default function Mcqs({ mcqs }) {
  const mode = useSelector(state=>state.mode.mode)

  const { program, semester, paper } = mcqs.pdetails ? mcqs.pdetails : { program: '', semester: '', paper: '' };
  const { mcqsArr } = mcqs;

  return (
    <>
      <Container sx={{ backgroundColor: mode === 'light' ? 'rgb(193, 193, 193)' : 'black' }} >
        <div className='wrapper' style={{backgroundColor:mode==='dark'?'rgb(30 30 30)':'#fff'}}>
          <h1 align="center">Examination of BS</h1>
          <div className="p-details">
            <div><b>BS:</b><span>{program ? program.program : ''}</span></div>
            <div><b>Semester:</b><span>{semester ? semester.semester : ''}</span></div>
            <div><b>Paper:</b><span>{paper ? paper.newpaper : ''}</span></div>
          </div>
          <hr />
          <McqsBox>
            {
              mcqsArr && mcqsArr.map((mcqs, i) => (
                <div style={{ fontSize: '20px', margin: '20px 0' }}>
                  {i + 1}.  {mcqs.mcq}
                  <div style={{ marginTop: '15px' }}>
                    <span>(a) {mcqs.option1}</span>
                    <span>(b) {mcqs.option2}</span>
                    <span>(c) {mcqs.option3}</span>
                    <span>(d) {mcqs.option4}</span>
                  </div>
                </div>

              ))
            }
          </McqsBox>
        </div>
 
      </Container>
    </>
  )
}

const Container = styled(Box)`
width:100%;
background:rgb(193, 193, 193);
padding:3rem 5rem;
&>.wrapper{
background:#fff;
min-height:80vh;
margin:0 auto;
width:80%;
border-radius:15px;
padding:2rem ;
box-shadow:2px 2px 30px 0px rgb(78, 77, 77);
&>.p-details{
  margin-top:1.5rem;
  margin-bottom:1rem;
  display:flex;
  font-size:1.5rem;
  justify-content:space-around;
  &>div>span{
    padding-left:10px;
    margin-left:10px;
  }
}
&>.Q-2{
  margin-top:1.4rem;
  &>h3{
    font-size:1.5rem;
  }
}
&>.Q-3{
  margin-top:2rem;
  &>h3{
    font-size:1.5rem;
  }
}
}
`

const Ulist = styled('li')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginTop: '10px',
  '&>li': {
    fontSize: '1.3rem',
    padding: '5px'
  }
})

const McqsBox = styled(Box)`
  line-height:30px;

  & span{
    margin:0 30px;
    font-weight:600;
  }
`