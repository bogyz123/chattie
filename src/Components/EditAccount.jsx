import { doc, setDoc } from "@firebase/firestore";
import { Close } from "@mui/icons-material";
import { Avatar, Button, IconButton, Input, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Styles/EditAccount.css";
import { auth, database } from "./Connection";
import { setNicknameColor } from "./Redux/UserSlice";

export default function EditAccount() {
    const nickname = localStorage.getItem("chatty_nickname");
    const [newNickname, setNewNickname] = useState();
    const currentColor = localStorage.getItem("chatty_color");
    const [newColor, setNewColor] = useState();


    const saveChanges = () => {
       
         
        
        localStorage.setItem("chatty_nickname", newNickname);
        localStorage.setItem("chatty_color", newColor);
       

    }
    return (
        <div id='edit-account'>

            <h3 id='editaccount-header'>Edit your account</h3>
            <div id='avatar'>
                <Avatar src=''></Avatar>
                <TextField defaultValue={nickname} onChange={(e) => setNewNickname(e.target.value)}></TextField>
            </div>
            <div>
                Nickname color <input type='color' defaultValue={currentColor} onInput={(e) => setNewColor(e.target.value)} />
            </div>
            <div>
                <Button fullWidth variant='contained' color='success' onClick={() => saveChanges()}>Save changes</Button>
            </div>
        </div>
    )
}