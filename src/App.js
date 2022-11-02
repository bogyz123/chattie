import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notInitialized } from "react-redux/es/utils/useSyncExternalStore";
import { Route, Router, Routes } from "react-router";
import { BrowserRouter } from 'react-router-dom'
import { auth } from "./Components/Connection";
import ErrorComponent from "./Components/ErrorComponent";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Protected from "./Components/Protected";
import { setIsLoggedIn } from "./Components/Redux/UserSlice";
import RegisterForm from "./Components/Register";



function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(setIsLoggedIn(true));
      }
      else {
        dispatch(setIsLoggedIn(false));
      }
    })
  }, [])
  const isLoggedIn = useSelector((state) => state.UserSlice.isLoggedIn);
  return (
    <BrowserRouter>
      < Navbar />
      <Routes>
        <Route path='/' element={
          <Protected>
            <Home />
          </Protected>}></Route>
        <Route path='/register' element={isLoggedIn ? <p>Please logout first.</p> : <RegisterForm />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App;
