import styled from "@emotion/styled";
import { Box, Dialog } from "@mui/material"
import { useState } from "react";

const DialogStyle = {
    height: "96%",
    maginTop: '12%',
    width: '60%',
    maxWidth: '400px',
    maxHeight: '200px',
    boxShadow: 'none',
    overflow: 'hidden',
    padding: '20px',
    display:'flex',
    justifyContent:'space-between'
}

export default function DialogMsg({open}) {
    // console.log('open: ',open)

    return (
        <div>
            <Dialog open={open} PaperProps={{ sx: DialogStyle }}>
                <p style={{fontSize:'25px',color:'#666666'}}>Do You Want To Delete Paper</p>
                <Buttons className="buttons">
                    <button>No</button>
                    <button >Yes</button>
                </Buttons>
            </Dialog>
        </div>
    )
}


const Buttons = styled(Box)`
    & button{
        float:right;
        margin-left:20px;
        background: purple;
        color:#fff;
        border:none;
        width:50px;
        font-size:19px;
        padding:7px;
        box-shadow:3px 3px 20px rgb(169, 168, 168);
    }
`