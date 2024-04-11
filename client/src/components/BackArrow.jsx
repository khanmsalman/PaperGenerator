import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material'

const BackArrow = ({ classes = '' }) => {
  const navigate = useNavigate();

  return (
    <div className={` w-14 px-3 py-3 rounded-full cursor-pointer transition-all duration-700 flex items-center justify-center hover:bg-slate-300 cursor-pointer-center ${classes}`} >
      <ArrowBack sx={{ fontSize: '2rem' }} onClick={() => navigate(-1)} />
    </div>
  )
}

export default BackArrow