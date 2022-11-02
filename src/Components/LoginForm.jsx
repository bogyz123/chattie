import styled from '@emotion/styled';
import { doc, getDoc, setDoc, updateDoc } from '@firebase/firestore';
import { Button, Checkbox, TextField } from "@mui/material";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "../Styles/LoginForm.css";
import { auth, database } from './Connection';
import {  setOnlineCount } from './Redux/UserSlice';

export default function LoginForm(props) {
    const [loginEmail, setLoginEmail] = useState();
    const [loginPassword, setLoginPassword] = useState();
    const dispatch = useDispatch();
    const onlineUsersRef = doc(database, "users", "OnlineUsers");
    const onlineCount = useSelector((state) => state.UserSlice.onlineData);

    const getNickname = () => {
        const promise = new Promise((resolve, reject) => {
            getDoc(doc(database, "users", loginEmail)).then((docSnap) => {
                return resolve(docSnap);
            }).catch(() => {
                return reject("Error");
            })
        })
        return promise;

    }
    const login = () => {
        signInWithEmailAndPassword(auth, loginEmail, loginPassword).then(() => {
            getNickname().then((nickname) => {
                localStorage.setItem("chatty_nickname", nickname.get("nickname"));
                getDoc(onlineUsersRef).then((snap) => {
                    setDoc(onlineUsersRef, { onlineAmount: (parseInt(onlineCount) + 1) });
                    dispatch(setOnlineCount((snap.get("onlineAmount"))));

                });
            })
        });
    }
    return (
        <div id='login-form' style={props.styles}>
            <p className="center">Login</p>
            <div id='input-container'>
                <TextField label='Email' color='error' type='email' size='small' onChange={(e) => setLoginEmail(e.target.value)}></TextField>
                <TextField label='Password' color='error' type='password' size='small' onChange={(e) => setLoginPassword(e.target.value)}></TextField>
                <div id='remember-me'>Remember me? <Checkbox name='Remember me'></Checkbox></div>
                <Button variant='contained' color='error' onClick={() => login()}>Login</Button>
                <div className="center">Need an account? <Link id='login-span' to='/register'>Register</Link></div>
            </div>
        </div>
    )
}
