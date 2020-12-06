import React from 'react'
import AndroidIcon from '@material-ui/icons/Android';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
function Message(props) {
   if(props.who!=='bot'){
     return(
       <dl style={{ width:'flex', right:15,position:"relative",textAlign: 'right'}}>
         <EmojiEmotionsIcon />
         <dt >{props.who}</dt>
         <dd>{props.text}</dd>
       </dl>

     )
   }
   else{
    return ( <dl style={{ width:'flex', left:15,position:"relative",textAlign: 'left'}}>
    <AndroidIcon />
    <dt >{props.who}</dt>
    <dd >{props.text}</dd>
  </dl>
       
       
    )
}
}
export default Message
