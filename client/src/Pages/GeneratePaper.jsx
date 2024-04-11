import styled from "@emotion/styled";
import { Alert, AlertTitle, Button, MenuItem, Select, TextField, } from "@mui/material";
import { Box } from "@mui/system";
// import {toast} from 'react-toastify'
import { useEffect, useState } from "react";
import { generatePaper, getNumofQtn, getPaper, getProgram, getSemester, } from "../services/Api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPaperDetails } from "../RTK/Slices/PaperSlice";

function GeneratePaper() {
  const [programs, setPrograms] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [papers, setPapers] = useState([]);
  const [semesterId, setSemesterId] = useState('')
  const [bsId, setBsId] = useState('')
  const [numofQtn, setNumofQtn] = useState({
    program: "", semester: "", newpaper: "",
  });
  const [paperQtns, setPaperQtns] = useState({
    numOfShorts: "", numOfLongs: "", numOfMcqs: "",
  });
  const [error, setError] = useState({
    status: false, msg: "", type: "",
  });
  const [input, setInput] = useState({
    program: "", semester: "", newpaper: "", lgQtn: "", stQtn: "", mcqs: "",
  });
  const mode = useSelector((state) => state.mode.mode);
  const { subjects,superAdmin } = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (input.program && input.semester && input.newpaper) {
      numOfQuestion(numofQtn);
    }
  }, [input.newpaper, input.semester, input.program]);


  const numOfQuestion = async (numofQtn) => {
    const res = await getNumofQtn(numofQtn);
    setPaperQtns(res.data.numOfQtn);
  };

  useEffect(() => {
    getAllProgams();
    getAllSemesters();
    getAllPapers();
  }, []);

  const getAllProgams = async () => {
    const res = await getProgram();
    setPrograms(res.data.programs);
  };

  const getAllSemesters = async () => {
    const res = await getSemester();
    setSemesters(res.data.semesters);
  };
  const getAllPapers = async () => {
    const res = await getPaper();
    setPapers(res.data.papers);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNumofQtn({ ...numofQtn, [name]: value._id });
    setInput({
      ...input,
      [name]: value._id,
    });
  };
  const semesterChange = (e) => {
    setSemesterId(e.target.value._id)
  }

//   useEffect(() => {
//     error && toast.error(error)
// }, [error]);


  const handleGenerate = async (e) => {
    dispatch(setPaperDetails(input)); // used in /fullpaper/${id} page to generate paper again on this details
    if (!input.program && !input.semester && !input.paper) {
      setError({
        status: true,
        msg: "Paper details is Required",
        type: "warning",
      });
    } else if (!input.program) {
      setError({ status: true, msg: "Program is Required", type: "warning" });
    } else if (!input.semester) {
      setError({ status: true, msg: "Semester is Required", type: "warning" });
    } else if (!input.newpaper) {
      setError({ status: true, msg: "Paper is Required ", type: "warning" });
    } else {
      
      const res = await generatePaper(input);
      if (res.data.id) {
        navigate(`/fullpaper/${res.data.id}`);
      }
      if (res.data.status === "success") {
        setError({ status: true, msg: res.data.message, type: "success" });
      }
      if (res.data.status === "warning") {
        setError({ status: true, msg: res.data.message, type: "warning" });
      }
      if (res.data.status === "error") {
        setError({ status: true, msg: res.data.message, type: "error" });
      }
    }
  };
  return (
    <>
      <Container style={{ background: mode === "dark" ? "" : "#eef8ff" }}>
        <Form
          style={{ background: mode === "dark" ? "#011b35" : "#fff" }}
          className="shadow-2xl drop-shadow-2xl"
        >
          <h1 className="text-2xl mt-5 text-center">
            Welcome to Paper Generator
          </h1>
          <SelectGroup>
            <Select
              name="program"
              onChange={(e) => {
                setInput((prevData) => ({
                  ...prevData,
                  [e.target.name]: e.target.value._id
                }))
                setBsId(e.target.value._id)
                setNumofQtn({ ...numofQtn, [e.target.name]: e.target.value });
              }}
              style={{ backgroundColor: "white", width: "32.5%" }}
            >
              {programs.map((program, i) => (
                <MenuItem key={i} value={program}>
                  {program.program}
                </MenuItem>
              ))}
            </Select>
            <Select
              name="semester"
              onChange={(e) => {
                setSemesterId(e.target.value._id)
                setNumofQtn({ ...numofQtn, [e.target.name]: e.target.value })
                setInput({
                  ...input,
                  [e.target.name]: e.target.value._id
                })
              }}
              style={{ backgroundColor: "white", width: "32.5%" }}
            >
              {semesters.map((semester, i) => (
                <MenuItem key={i} value={semester}>
                  {semester.semester}
                </MenuItem>
              ))}
            </Select>
            <Select
              name="newpaper" 
              disabled={!input.program && !input.semester}
              onChange={handleChange}
              style={{ backgroundColor: "white", width: "32.5%" }}
            >
              {papers.filter((paper) => semesterId === paper.semester && bsId === paper.program).map((paper, i) => {
                const Check = subjects.length>0 && subjects.find((sub)=>(sub===paper._id))
                return (
                  <MenuItem disabled={!(!!Check || superAdmin)} key={i} value={paper}>
                    {paper.newpaper}
                  </MenuItem>
                )
              }
              )}
            </Select>
          </SelectGroup>

          <TField
            label="Enter No.of Mcq's "
            name="mcqs"
            onChange={(e)=>{
              setNumofQtn({ ...numofQtn, [e.target.name]: e.target.value._id });setInput({...input, [e.target.name]:e.target.value})}}
            value={input.mcqs}
          />
          <br />
          <br />
          <TField
            label="Enter No.of short Questions"
            name="stQtn"
            onChange={(e)=>{
              setNumofQtn({ ...numofQtn, [e.target.name]: e.target.value._id });setInput({...input, [e.target.name]:e.target.value})}}
            value={input.stQtn}
          />
          <br /><br />
          <TField
            label="Enter No.of Long Questions"
            name="lgQtn"
            onChange={(e)=>{
              setNumofQtn({ ...numofQtn, [e.target.name]: e.target.value._id });setInput({...input, [e.target.name]:e.target.value})}}
            value={input.lgQtn}
          />
          <br /> <br />
          <div
            style={{ paddingLeft: "3px", paddingRight: "3px", paddingTop: "1.8rem", textAlign: "center", }}
          >
            <button
              type="submit"
              onClick={handleGenerate}
              className="w-[90%] -mt-2 bg-[#6900b0] text-white p-2 rounded"
            >
              Generate Paper
            </button>
          </div>
          {error.status === true ? (
            <Alert className="alrt" severity={error.type}>
              <AlertTitle>{error.type}</AlertTitle>
              {error.msg}
            </Alert>
          ) : (
            ""
          )}
        </Form>
        <div
          className="count-qtn"
          style={{
            backgroundColor: mode === "dark" ? "#011b35" : "#fff",
            minWidth: "300px",
          }}
        >
          <h1 className="text-2xl">Questions of the paper are</h1>
          <p>
            Mcq's are: <span> {paperQtns.numOfMcqs} </span>
          </p>
          <p>
            Short Questions: <span>{paperQtns.numOfShorts}</span>
          </p>
          <p>
            Long Questions: <span> {paperQtns.numOfLongs}</span>
          </p>
        </div>
      </Container>
    </>
  );
}

const Form = styled(Box)`
  width: 40%;
  min-width: 300px;
  height: 87vh;
  padding: 20px;
  padding-top: 10px;
  border-radius: 50%/10%;
  margin-left: 20px;
  background: linear-gradient(145deg, #bababa, #dddddd);
`;

const TField = styled(TextField)`
  width: 100%;
  background-color: #fff;
  border-radius: 20px;
`;

const Container = styled(Box)`
  height: 94vh;
  display: flex;
  padding: 30px;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;

  & .count-qtn {
    width: 35%;
    height: 60%;
    margin-top: 30px;
    padding: 20px;
    border-radius: 50%/16%;
    box-shadow: 3px 3px 15px #808080d0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    box-shadow: 5px 5px 26px #878787;

    & > p {
      font-size: 20px;
      margin-left: 20px;
      letter-spacing: 1px;
    }
  }
`;

const SelectGroup = styled("div")({
  padding: "5px",
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "15px",
  marginTop: "25px",
  "&>Select": {
    border: "2px solid red",
  },
});

export default GeneratePaper;
