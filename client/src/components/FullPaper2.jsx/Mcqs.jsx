import { Box, Button, styled } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Mcqs({ mcqs }) {
  const mode = useSelector((state) => state.mode.mode);

  const { program, semester, paper } = mcqs.pdetails ? mcqs.pdetails : { program: "", semester: "", paper: "" };
  const { mcqsArr } = mcqs;
 
  return (
    <>
      <Container 
        sx={{
          backgroundColor: mode === "light" ? "rgb(193, 193, 193)" : "#001e3c",
        }}
      >
        <div
          className="wrapper"
          style={{
            backgroundColor: mode === "dark" ? "#00172e" : "#fff",
          }}
        >
          <h1 align="center">Examination of BS</h1>
          <div className="p-details">
            <div>
              <b>BS:</b>
              <span>{program ? program.program : ""}</span>
            </div>
            <div>
              <b>Semester:</b>
              <span>{semester ? semester.semester : ''}</span>
            </div>
            <div>
              <b>Paper:</b>
              <span>{paper ? paper.newpaper : ""}</span>
            </div>
          </div>
          <hr />
          <h2 style={{textAlign:'center',padding:'15px 0 0px 0'}} >Section - A  &nbsp;&nbsp;&nbsp; (MCQs)</h2>
          <McqsBox>
            {mcqsArr &&
              mcqsArr.map((mcqs, i) => (
                <div style={{ fontSize: "20px", margin: "20px 0" }}>
                  {i + 1}) {mcqs.mcq}
                  <div style={{ marginTop: "15px" ,display:'flex',justifyContent:'space-between',flexWrap:'wrap' }}>
                    <span>(a) {mcqs.option1}</span>
                    <span>(b) {mcqs.option2}</span>
                    <span>(c) {mcqs.option3}</span>
                    <span>(d) {mcqs.option4}</span>
                  </div>
                </div>
              ))}
          </McqsBox>
        </div>
      </Container>
    </>
  );
}

const Container = styled(Box)`
  width: 100%;
  padding: 3rem 5rem;
  & > .wrapper {
    background: #fff;
    min-height: 80vh;
    margin: 0 auto;
    width: 90%;
    border-radius: 15px;
    padding: 2rem;
    // box-shadow:2px 2px 30px 0px rgb(78, 77, 77);
    & > .p-details {
      margin-top: 1.5rem;
      margin-bottom: 1rem;
      display: flex;
      font-size: 1.5rem;
      padding: 0 40px;
      justify-content: space-between;
      flex-wrap:wrap;
      & > div > span {
        padding-left: 10px;
        margin-left: 10px;
      }
    }
  }
`;


const McqsBox = styled(Box)`
  line-height: 30px;
   padding:10px 40px;
  & span {
    margin: 0 30px;
    font-weight: 600;
  }
`;
