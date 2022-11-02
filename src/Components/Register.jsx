import styled from '@emotion/styled';
import { addDoc, collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from '@firebase/firestore';
import { Close } from '@mui/icons-material';
import { Button, Checkbox, Dialog, TextField } from "@mui/material";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import "../Styles/LoginForm.css";
import { auth, database } from './Connection';
import { setNickname, setNicknameColor, setOnlineCount, setOnlineData } from './Redux/UserSlice';

export default function RegisterForm() {
    const [registerEmail, setRegisterEmail] = useState();
    const [registerPassword, setRegisterPassword] = useState();
    const [registerNickname, setRegisterNickname] = useState();
    const nav = useNavigate();
    const dispatch = useDispatch();
    const onlineUsersRef = doc(database, "users", "OnlineUsers");
    const onlineCount = useSelector((state) => state.UserSlice.onlineCount);
    const [color, setColor] = useState();


    const registerHandler = () => {
        createUserWithEmailAndPassword(auth, registerEmail, registerPassword).then((user) => {
            setDoc(doc(database, "users", registerEmail), { nickname: registerNickname })
            

            localStorage.setItem("chatty_nickname", registerNickname);
            localStorage.setItem("chatty_color", color);

            nav("/");
        }).catch((errorMessage) => {
            alert(errorMessage);
        });
    }
    return (
        <div id='login-form'>

            <p className="center">Register</p>

            <div id='input-container'>
                <TextField onChange={(e) => setRegisterEmail(e.target.value)} label='Email' color='error' type='email' size='small' required></TextField>
                <TextField onChange={(e) => setRegisterPassword(e.target.value)} label='Password' color='error' type='password' size='small' required></TextField>
                <TextField onChange={(e) => setRegisterNickname(e.target.value)} label='Nickname' color='error' size='small' required></TextField>
                <div><p>Please choose a color for your username</p> <input type='color' onChange={(e) => setColor(e.target.value)} defaultValue='#FFFFFF'></input></div>
                <div id='remember-me'>Remember me? <Checkbox name='Remember me'></Checkbox></div>
                <Button variant='contained' color='error' onClick={() => registerHandler()}>Register</Button>
                <div className="center">Already a user? <Link id='login-span' to='/'>Login</Link></div>
            </div>
        </div>
    )
}
const TextFieldStyled = styled(TextField)({

})