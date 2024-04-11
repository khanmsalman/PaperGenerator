import { useSelector } from 'react-redux'
import './Footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  const mode = useSelector(state=>state.mode.mode)
  return (
    <div className='footer' style={mode==='dark'?{background:'linear-gradient(rgb(13, 0, 21), rgba(74, 0, 74, 0.581)),url(../../../public//images//bgimage.jpg), no-repeat'}:null}>
      <div className="f-wrapper">
        <div className="box">
          <h3>Quick Links</h3> 
          <ul className="q-links">
            <li><Link to='/' >Home</Link></li>
            <li><Link to="/allpapers">All Papers</Link></li>
             <li><Link to="/generate">Generate Paper</Link></li>
            <li><Link to="/">Add Details</Link></li>
            <li><Link to="/">Feed Questions </Link></li>
          </ul> 
        </div>
        <div className="box">
          <h3>Extra links</h3>
          <ul className="q-links">
            <li><a href="/">Home</a></li>
            <li><a href="/">All Papers</a></li>
            <li><a href="/">Generate Paper</a></li>
          </ul>
        </div>
        <div className="box">
          <h3>Follow Us</h3>
          <ul className="q-links">
            <li><a href="/">Github</a></li>
            <li><a href="/">Linked In</a></li>
            <li><a href="/">Instagram</a></li>
            <li><a href="/">Facebook</a></li>
            <li><a href="/">Twitter</a></li>
          </ul>
        </div>

      </div>
      <h2 className='credit'>
        Created By <span>Muhammad Salman</span> |All Right Reserved
      </h2>
    </div>
  )
}
