
import { Container, Dialog, MenuItem, MenuList } from "@mui/material";
import { useSelector } from "react-redux";
import "../Styles/Navbar.css";
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from "firebase/auth";
import { auth } from "./Connection";
import { useNavigate } from "react-router";
import { Close, Edit, Logout, Menu } from "@mui/icons-material";
import Meni from '@mui/material/Menu';
import { useState } from "react";
import EditAccount from "./EditAccount";


export default function Navbar() {

    const isLoggedIn = useSelector((state) => state.UserSlice.isLoggedIn);
    const nav = useNavigate();
    const [anchorElement, setAnchorElement] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);


    const STYLES = {
        navbar: {
            display: 'flex',
            alignItems: 'center'
        }, brand: {
            cursor: 'pointer',
            fontSize: '1.1rem'
        }
    }
    const logout = () => {
        signOut(auth);
    }
    const openMenu = (e) => {

        setAnchorElement(e.currentTarget);
    }
    const closeMenu = () => {

        setAnchorElement(null);
    }
    const signout = () => {
        closeMenu();
        signOut(auth);
    }

    return (
        <Container id='navbar' sx={STYLES.navbar} fullWidth>
            <div onClick={() => nav("/")} style={STYLES.brand}><p>Chattie</p></div>
            <div id='navbar-controls'>

            </div>

            {isLoggedIn &&
                <>
                    <div id='account-menu'>

                        <div onClick={(e) => openMenu(e)}>
                            <Menu />
                        </div>

                        <Meni open={Boolean(anchorElement)} anchorEl={anchorElement} keepMounted onClose={() => closeMenu()}>
                            <MenuItem onClick={() => setDialogOpen(true)}>My Account</MenuItem>
                            <MenuItem onClick={() => signout()}>Logout</MenuItem>
                        </Meni>
                        <Dialog open={dialogOpen}>
                            <div onClick={() => setDialogOpen(false)} className='hoverable'><Close /></div>
                            <EditAccount />
                        </Dialog>



                    </div>
                    <div id='account-actions'>
                        <div> <span>Account</span></div>
                        <div id='account-icons'>
                            <div className="hoverable" onClick={() =>  signOut(auth)}><Logout /></div>
                            <div className="hoverable" onClick={(e) => openMenu(e)}><Edit /></div>
                        </div>
                    </div>
                </>
            }


        </Container >
    )
}
