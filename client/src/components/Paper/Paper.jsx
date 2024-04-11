import { Box, Button, styled } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Paper({ mypaper }) {
  const [genPaper, setGenPaper] = useState([]);
  const [paperDetails, setPaperDetails] = useState({});
  const mode = useSelector((state) => state.mode.mode);
  const [loader, setLoader] = useState(false);

  const { program, semester, paper } = mypaper.pdetails ? mypaper.pdetails : { program: "", semester: "", paper: "" };
  const { longArr, shortArr } = mypaper;

  // const downloadPDF = () => {
  //   const capture = document.querySelector(".wrapper");
  //   setLoader(true);
  //   html2canvas(capture, { width:1200, height:1000 }).then((canvas) => {
  //     const doc = new jsPDF();
  //     const aspectRatio = canvas.width / canvas.height;
  //     const pdfWidth = 260;
  //     const pdfHeight = pdfWidth / aspectRatio;

  //     const imgData = canvas.toDataURL("img/png");// used in addImage data below line
  //     doc.addImage(imgData, 'PNG',0, 0, pdfWidth,pdfHeight);

  //     setLoader(false)
  //     doc.save('generated-paper.pdf');
  //   });
  // };

  return (
    <>
      <Container
        sx={{
          backgroundColor: mode === "light" ? "rgb(193, 193, 193)" : "black",
        }}
      >
        <div
          className="wrapper"
          style={{
            backgroundColor: mode === "dark" ? "rgb(30 30 30)" : "#fff",
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
          {
            shortArr?.length > 0 && (
              <div className="Q-2">
                <h3>Q:2:- Attempt the short Questions</h3>
                <Ulist type="1">
                  {shortArr && shortArr ? (
                    shortArr.map((short) => {
                      return <li>{short.sQuestion}</li>;
                    })
                  ) : (
                    <h2>Loading...</h2>
                  )}
                </Ulist>
              </div>
            )
          }
          {
            longArr?.length > 0 && (
              <div className="Q-3">
                <h3>Q:3:- Attempt the Long Questions</h3>
                <Ulist type="1">
                  {longArr && longArr ? (
                    longArr.map((long) => {
                      return <li>{long.lQuestion}</li>;
                    })
                  ) : (
                    <h2>Loading...</h2>
                  )}
                </Ulist>
              </div>
            )
          }
        </div>

      </Container>
    </>
  );
}

const Container = styled(Box)`
  width: 100%;
  background: rgb(193, 193, 193);
  padding: 3rem 5rem;
  & > .wrapper {
    min-height: 80vh;
    margin: 0 auto;
    width: 80%;
    border-radius: 15px;
    padding: 2rem;

    box-shadow: 2px 2px 30px 0px rgb(78, 77, 77);
    & > .p-details {
      margin-top: 1.5rem;
      margin-bottom: 1rem;
      display: flex;
      font-size: 1.5rem;
      justify-content: space-around;
      & > div > span {
        padding-left: 10px;
        margin-left: 10px;
      }
    }
    & > .Q-2 {
      margin-top: 1.4rem;
      & > h3 {
        font-size: 1.5rem;
      }
    }
    & > .Q-3 {
      margin-top: 2rem;
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
