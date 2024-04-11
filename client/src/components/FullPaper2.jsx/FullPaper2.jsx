import './style.css'
import Mcqs from './Mcqs'
import Paper from './Paper'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getGenPaper } from '../../services/Api'
import { useDispatch, useSelector } from 'react-redux'
import { deleteById } from '../../RTK/Slices/PaperSlice'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ArrowBack, DownloadingRounded, DownloadRounded, DeleteRounded } from '@mui/icons-material'
import BackArrow from '../BackArrow'

export default function FullPaper2() {
  const [genPaper, setGenPaper] = useState([]);
  // const [paper, setPaper] = useState({})
  // const [mcqs, setMcqs] = useState({})
  // const [isPaper, setIsPaper] = useState('paper');
  const [loader, setLoader] = useState('');

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

    return () => {
    }
    //eslint-disable-next-line
  }, [])


  // const genPaperAgain = async () => {
  //   if (window.confirm(`Do you want to ReGenerate paper of "${genPaper.pdetails.paper}",  ${genPaper.pdetails.semester} Semester, ${genPaper.pdetails.program}  `)) {
  //     const res = await generatePaper(paperDetails);
  //     if (res.data.id) {
  //       navigate(`/fullpaper/${res.data.id}`)
  //     }
  //   } else {
  //     navigate('/allpapers')
  //   }
  // }

  const handleReject = async () => {
    if (window.confirm("Are You Sure to Delete the Paper")) {
      dispatch(deleteById(id));
      navigate("/allpapers")
    }
  }

  const downloadMcqsPDF = () => {

    const capture1 = document.querySelector(".mcqspaper");
    setLoader('mcqs');
    try {
      html2canvas(capture1).then((canvas) => {
        const doc = new jsPDF();
        const aspectRatio = canvas.width / canvas.height;
        const pdfWidth = 230;
        const pdfHeight = pdfWidth / aspectRatio;
        const imgData = canvas.toDataURL("img/png");// used in addImage data below line
        doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        // doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        setLoader('')
        doc.save('genpaper.pdf');
      });
    } catch (error) {
      console.log(error.message)
    }

  };
  const downloadQtnPDF = () => {
    const capture1 = document.querySelector(".qtnpaper");
    setLoader('paper');
    try {
      html2canvas(capture1).then((canvas) => {
        const doc = new jsPDF();
        const aspectRatio = canvas.width / canvas.height;
        const pdfWidth = 200;
        const pdfHeight = pdfWidth / aspectRatio;
        const imgData = canvas.toDataURL("img/png");// used in addImage data below line
        doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        // doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        setLoader('')
        doc.save('genpaper.pdf');
      });
    } catch (error) {
      console.log(error.message)
    }

  };
  return (
    <>
      <div className={`full-papers bg-[#c1c1c1] pb-6 ${mode === 'dark' ? 'bg-[#001e3c]' : ''}`}  >
        <BackArrow />
        <div className="mcqspaper">
        <Mcqs mcqs={mcqs} />
        </div>
        <div className="qtnpaper">
        <Paper mypaper={paper} />
        </div>
      </div>
      <div className={`text-center bg-[#c1c1c1] pb-12 ${mode === 'dark' ? 'bg-[#001e3c]' : ''}`}>
        <button onClick={downloadMcqsPDF} className='bg-primary text-white px-5 py-2 rounded-md text-md' style={{ width: '199px', margin: '0 10px' }} >{loader==='mcqs' ? <><DownloadingRounded sx={{ marginLeft: '-10px', marginRight: '10px' }} />Downloading</> : <><DownloadRounded sx={{ marginLeft: '-10px', marginRight: '10px' }} /> Download Mcqs</>}</button>
        <button onClick={downloadQtnPDF} className='bg-primary text-white px-5 py-2 rounded-md text-md' style={{ width: '199px', margin: '0 10px' }} >{loader==='paper' ? <><DownloadingRounded sx={{ marginLeft: '-10px', marginRight: '10px' }} />Downloading</> : <><DownloadRounded sx={{ marginLeft: '-10px', marginRight: '10px' }} /> Download Paper</>}</button>
        <button onClick={() => handleReject()} className='bg-primary text-white px-5 py-2 rounded-md text-lg' style={{ width: '180px', margin: '0 10px' }} ><DeleteRounded sx={{ marginLeft: '-20px', marginRight: '10px' }} /> Delete</button>
      </div>

    </>
  )
}