import { useSelector } from "react-redux";
import "./Home.css";
import { Link } from "react-router-dom";
import AnimatedText from "../../components/AnimatedText";
import About from "../../components/About";

export default function Home() {
  const mode = useSelector((state) => state.mode.mode);

  return (
    <div className={` ${mode==='dark'?'':'bg-bgColor'}`}>
      <div className="home">
        <div className="home-radius flex flex-col justify-start items-start pt-[10%] pl-[10%]" style={{ backgroundImage: mode === 'dark' ? "linear-gradient(to right, #000000c8, #0000006f,   #00000018,  #0000009c),url('../../../public/images/header3.jpeg')" : '' }}>
          <AnimatedText text="Welcome To Question Paper Generator" classes="text-[1.7vw] text-white Moderno" />
          <AnimatedText text="Create Your Papers Automatically" classes="text-[4vw] pb-6 font-semibold text-white" />
          <Link to='/generate' className="hover:bg-primary/75 bg-primary" >Get Started </Link>
        </div>
      </div>
      <About />
    </div>
  );
}


