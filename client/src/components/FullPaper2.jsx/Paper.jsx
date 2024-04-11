import { Box, styled } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";


export default function Paper({ mypaper }) {
  const mode = useSelector((state) => state.mode.mode);

  const { program, semester, paper } = mypaper.pdetails
    ? mypaper.pdetails
    : { program: "", semester: "", paper: "" };
  const { longArr, shortArr } = mypaper;

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
              <span>{semester ? semester.semester : ""}</span>
            </div>
            <div>
              <b>Paper:</b>
              <span>{paper ? paper.newpaper : ""}</span>
            </div>
          </div>
          <hr /> 
          <h2 style={{textAlign:'center',padding:'15px 0 0px 0'}} >Section - B</h2>
          <div className="Q-2">
            <h3>Q:2:- Attempt the short Questions</h3>
            <Ulist type="1">
              {shortArr ? (
                shortArr.map((short) => {
                  return <li>{short.sQuestion}</li>;
                })
              ) : (
                <h2>Loading...</h2>
              )}
            </Ulist>
          </div>
          <div className="Q-3">
            <h3>Q:3:- Attempt the Long Questions</h3>
            <Ulist type="1">
              {longArr ? (
                longArr.map((long) => {
                  return <li>{long.lQuestion}</li>;
                })
              ) : (
                <h2>Loading...</h2>
              )}
            </Ulist>
          </div>
        </div>
      </Container>
    </>
  );
}

const Container = styled(Box)`
  width: 100%;
  padding: 3rem 5rem;
  & > .wrapper {
    min-height: 80vh;
    margin: 0 auto;
    width: 90%;
    border-radius: 15px;
    padding: 2rem;
    & > h1{
      font-size:2rem;
    }

    // box-shadow: 2px 2px 30px 0px rgb(78, 77, 77);
    & > .p-details {
      margin-top: 1.5rem;
      margin-bottom: 1rem;
      display: flex;
      font-size: 1.5rem;
      padding:0 40px;
      flex-wrap:wrap;
      justify-content: space-between;
      & > div > span {
        padding-left: 10px;
        margin-left: 10px;
      }
    }
    & > .Q-2 {
      margin-top: 1.2rem;
      padding:20px 40px;
      & > h3 {
        font-size: 1.5rem;
      }
    }
    & > .Q-3 {
      margin-top: 1rem;
      padding:20px 40px;
      & > h3 {
        font-size: 1.5rem;
      }
    }
  }
`;

const Ulist = styled("li")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  marginTop: "10px",
  "&>li": {
    fontSize: "1.3rem",
    padding: "5px",
  },
});
