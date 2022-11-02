import { Paper } from "@mui/material";
import "../Styles/Message.css";

export default function Message({ children, col, bg, ml, wrap}) {
    return (
        <Paper className='message' style={{ color: col, backgroundColor: bg, marginLeft:ml}}>
            <div style={{wordBreak:'break-all'}}>{children}</div>
        </Paper>
    )
}