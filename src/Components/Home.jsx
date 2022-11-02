import { signInWithEmailAndPassword } from "firebase/auth"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { auth, database } from "./Connection"
import "../Styles/Home.css";
import { Avatar, Button, Dialog, Input, TextField } from "@mui/material";
import Message from "./Message";
import { addDoc, collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, where } from "@firebase/firestore";
import UserSlice, { setNickname, setNicknameColor } from "./Redux/UserSlice";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Close, Forward, Save, Send } from "@mui/icons-material";


export default function Home() {
    const isLoggedIn = useSelector((state) => state.UserSlice.isLoggedIn);


    const [allMessages, setAllMessages] = useState([]);
    const [message, setMessage] = useState();
    const nickname = localStorage.getItem("chatty_nickname");
    const email = auth.currentUser.email;
    const dispatch = useDispatch();
    const msgRef = query(collection(database, "messages"), orderBy("createdAt"), limit(3020));
    const ref = useRef();
    const [colorDialog, setColorDialog] = useState(true);
    const color = localStorage.getItem("chatty_color");
    const [dialogCol, setDialogCol] = useState();

    const inputRef = useRef();
    const scrollRef = useRef();


    useEffect(() => {
        getDocs(msgRef).then((snap) => {
            setAllMessages([...snap.docs]);
        })
        onSnapshot(msgRef, (snap) => {
            setAllMessages([...snap.docs]);
        })

    }, [])
    const send = () => {
        if (message === "" || message === undefined) {
            return;
        }
        setDoc(doc(collection(database, "messages")), { sender: nickname, message: message, senderColor: color, createdAt: serverTimestamp() }).then(() => {
            inputRef.current.value = "";
        });
        inputRef.current.focus();
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });

    }
    const saveChanges = () => {
        localStorage.setItem("chatty_color", dialogCol);
    }
    const goToUserProfile = (user) => {

    }

    return (
        <div id='home'>
            <div id='chatbox'>
                <div id='messages'>
                    {allMessages.map((message, index) => message.get("sender") === nickname ? <><div className="self"><div className='sender' style={{ color: message.get("senderColor") }}>{message.get("sender")}</div> <Message bg='rgb(20,20,20)' col='#fff'>{message.get("message")}</Message></div></> : <><div className='sender'>{message.get("sender")}</div> <Message bg='rgb(20,20,20)' col='#fff'>{message.get("message")}</Message></>
                    )} <div azref={scrollRef}></div>
                </div>
                <div id='msg-sender' ref={scrollRef}>
                    <div id='test' ><Input placeholder='Write a message...' inputProps={{ style: { color: '#fff', fontFamily: 'Roboto Condensed' } }} inputRef={inputRef} onChange={(e) => (setMessage(e.target.value))} fullWidth label='Send a message...' color='error'></Input></div> <div onClick={() => send()} className='hoverable'></div>
                    <div className='hoverable' onClick={() => send()}><Send /></div>
                </div>


            </div>
        </div>
    )
}