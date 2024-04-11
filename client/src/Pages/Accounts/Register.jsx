import { Link, useLocation, useNavigate } from 'react-router-dom'
import './style.css'
import { useState } from 'react'
import { useEffect } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import toast from 'react-hot-toast'
// import { loginUser, signupUser } from '../../services/Api'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin, userSignUp } from '../../RTK/Slices/AuthSlice';

const Register = () => {
    const { pathname } = useLocation();
    const [signup, setSignup] = useState({ name: '', email: '', password: '' })
    const [login, setLogin] = useState({ email: '', password: '' })
    const [isSignup, setisSignup] = useState(pathname === '/signup' ? true : false)
    const [timeSignup, setTimeSignup] = useState(true);
    const [showPass, setShowPass] = useState(false);
    const mode = useSelector(state => state.mode.mode);

    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        setisSignup(pathname === '/signup' ? true : false)
    }, [pathname])

    useEffect(() => {
        setTimeout(() => {
            setTimeSignup(isSignup)
        }, [250])
    }, [isSignup])



    const signUpUser = async () => {
        // const res = await signupUser(signup)
        dispatch(userSignUp({signup,toast,navigate}))
        setSignup({
            name: '',
            email: '',
            password: '',
        })
    }

    // Login data send to api
    const logInUser = async () => {
        dispatch(userLogin({login,toast,navigate}));            
            setLogin({email:'', password:''})
        
        // const res = await loginUser(login);
        // if (res.data.isSuccess) {
        //     localStorage.setItem("token", res.data.token)
        //     localStorage.setItem("user", JSON.stringify(res.data.user));
        //     toast(res.data.user.name + ' Login Successfull')
        //     setLogin({ email: '', password: '' })
        //     navigate('/')
        // } else {
        //     res.data.message && toast(res.data.message)
        // }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignup({ ...signup, [name]: value })
    }


    return (
        <div className='register-con' style={mode === 'dark' ? { background: '#001E3C' } : { background: '#d7ecf5' }}>
            <div className="forms-container">

                <div className="form-left" style={isSignup ? { left: '50%' } : { left: 0 }}>
                    <div className='form-signup' style={timeSignup ? { display: 'flex' } : { display: 'none' }}>
                        <h2>Create An Account</h2>
                        {/* <button>Google</button> */}
                        <p>or use Your Email and Password</p>
                        <input type="text" name='name' value={signup.name} onChange={handleChange} placeholder='Name' />
                        <input type="email" name='email' value={signup.email} onChange={handleChange} placeholder='Email' />
                        <div className="input" >
                            <input type={`${showPass ? 'text' : 'password'}`} className='pass' name='password' value={signup.password} onChange={handleChange} placeholder='Password' />
                            <span onClick={() => setShowPass(!showPass)} style={{ zIndex: 10 }}>
                            {showPass ? <VisibilityIcon className='text-primary' /> : <VisibilityOffIcon className='text-primary' />}
                            </span>
                            <div className="bbtm"></div>
                        </div>
                        <button onClick={signUpUser}>Sign Up</button>
                    </div>
                    <div className='form-signin' style={timeSignup ? { display: 'none' } : { display: 'flex' }}>
                        <h2>Sign In</h2>
                        {/* <button>Google</button> */}
                        <p>or use Your Email and Password</p>
                        <input type="email" name='email' value={login.email} onChange={(e) => setLogin({ ...login, [e.target.name]: e.target.value })} placeholder='Email' />
                        <div className="input">
                            <input type={`${showPass ? 'text' : 'password'}`} className='pass' name='password' value={login.password} onChange={(e) => setLogin({ ...login, [e.target.name]: e.target.value })} placeholder='Password' />
                            <span onClick={() => setShowPass(!showPass)} style={{ zIndex: 10 }} >
                                {showPass ? <VisibilityIcon className='text-primary' /> : <VisibilityOffIcon className='text-primary' />}
                            </span>
                            <div className="bbtm "></div>
                        </div>
                        <button onClick={logInUser}>Sign In</button>
                    </div>
                </div>

                <div className={`welcome-right ${isSignup ? 'radius1' : 'radius2'}`} style={isSignup ? { left: 0 } : { left: '55%' }}>
                    <div className={`welcome1 `} style={isSignup ? { display: 'none' } : { display: 'flex' }}>
                        <h2>Welcome</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <button><Link to='/signup'>Sign Up</Link></button>
                    </div>
                    <div className={`welcome2 `} style={isSignup ? { display: 'flex' } : { display: 'none' }}>
                        <h2>Hi, Friends!</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <button><Link to='/login'>Sign In</Link></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register