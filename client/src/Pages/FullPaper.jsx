import { Button, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Paper from '../components/Paper/Paper'
import Mcqs from '../components/Paper/Mcqs'
import { useNavigate, useParams } from 'react-router-dom'
import { generatePaper, getGenPaper } from '../services/Api'
import { useDispatch, useSelector } from 'react-redux'
import { deleteById } from '../RTK/Slices/PaperSlice'



export default function FullPaper() {
  const [paperInput, setPaperInput] = useState({
    program: '',
    semester: '',
    newpaper: '',
    lgQtn: '',
    stQtn: '',
    mcqs: '',
  });
  const [genPaper, setGenPaper] = useState([]);
  // const [paper, setPaper] = useState({})
  // const [mcqs, setMcqs] = useState({})
  const [isPaper, setIsPaper] = useState('paper');
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let mode = useSelector((state) => state.mode.mode)
  const paperDetails = useSelector((state) => state.papers.genPaperDetails)
  const { id } = useParams();

  const { mcqsArr, ...paper } = genPaper;
  const { shortArr, longArr, ...mcqs } = genPaper;

  useEffect(() => {
    const getGeneratedPaper = async () => {
      const res = await getGenPaper(id);
      setGenPaper(res.data)
    }
    getGeneratedPaper(); 
  }, [])


  const genPaperAgain = async () => {
    if (window.confirm(`Do you want to ReGenerate paper of "${genPaper.pdetails.paper}",  ${genPaper.pdetails.semester} Semester, ${genPaper.pdetails.program}  `)) {
      const res = await generatePaper(paperDetails);
      if (res.data.id) {
        navigate(`/fullpaper/${res.data.id}`)
      }
    } else {
      navigate('/allpapers')
    }
  }

  const handleReject = async () => {
    if (window.confirm("Are You Sure to Delete the Paper")) {
      dispatch(deleteById(id));
      genPaperAgain();    // function is defined above
    }
  }

  return (
    <>
      <Navi sx={{ background: mode === 'dark' ? 'rgb(40, 40, 40)' : '#C1C1C1' }}>
        <ul className='cursor-pointer'>
          <li style={{ borderBottom: isPaper === 'mcqs' ? '2px solid purple' : '' }} onClick={() => { setIsPaper('mcqs') }} >Mcqs</li>
          <li onClick={() => { setIsPaper('paper') }}  style={{ borderBottom: isPaper === 'paper' ? '2px solid purple' : '' }}>Question Paper</li>
        </ul>
      </Navi>

      <div  >
        {
          isPaper === 'paper' ? <Paper mypaper={paper} /> : <Mcqs mcqs={mcqs} />
        }
      </div>
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <Button onClick={() => handleReject()} variant="contained" color="secondary" size="medium" sx={{ width: '200px', marginRight: '10px' }} >Reject</Button>
        <Button onClick={() => navigate('/allpapers')} variant="contained" color="secondary" size="medium" sx={{ width: '200px' }} >Save </Button>
      </div>
      
    </>
  )
}

const Navi = styled('nav')({
  border: '0.01px solid #ffffff00',
  '& ul': {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center',
    fontSize: '20px',
    '& li': {
      marginRight: '20px',
      paddingBottom: '6px',
    }
  }
})