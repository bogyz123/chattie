import { useSelector } from "react-redux";
import RegisterForm from "./Register";
import "../Styles/Protected.css";
import LoginForm from "../Components/LoginForm";
import clouds from "../Sprites/clouds.jpg";

export default function Protected({ children }) {
    var isLoggedIn = useSelector((state) => state.UserSlice.isLoggedIn);
    const styles = {
        loginForm: {
            borderRight: '1px solid black'
        }
    }
    // Ovako.. Ovaj page se renderuje uvek, ako nismo logani sve u ovom divu se renderuje, napravi CSS lepo i uredi reponsiveness.
    // Takodje, ako smo logani onda ce children biti rendered u prevodu Home componenta. Home componenta sadrzi sve sto ce u buducnosti biti, useri, etc.
    return (
        <div>
            {isLoggedIn ? children :
                <div id='protected'>
                    <div id='inner'>
                        <div id='clouds'> <img src={clouds} /></div>
                        <LoginForm styles={styles.loginForm} />
                    </div>
                </div>}
        </div>
    )
}