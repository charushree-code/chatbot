
import React from "react";
import {Link} from 'react-router-dom';
import ModeCommentSharpIcon from '@material-ui/icons/ModeCommentSharp';
function home(){
    return(
    <div>
        <Link to='/chatbot'>
        <ModeCommentSharpIcon fontSize='large' />
        </Link>
    </div>)
}
export default home;