import React,{useEffect} from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../../_actions/message_actions';

import Message from './Message';
import LocalHospitalRoundedIcon from '@material-ui/icons/LocalHospitalRounded';
import AndroidIcon from '@material-ui/icons/Android';

function Chatbot() {
    const dispatch = useDispatch();
    const messagesFromRedux = useSelector(state => state.message.messages)
   useEffect(() => {
        eventQuery('welcome_to_safeconnect')}, [])

    const textQuery = async (text) => {
    //  First  Need to  take care of the message I sent     
        let conversation = {
            who: 'user',
            content: {
                text: {
                    text: text
                }
            }
        }
        dispatch(saveMessage(conversation))
        // We need to take care of the message Chatbot sent 
        const textQueryVariables = {
            text
        }
        try {
            //I will send request to the textQuery ROUTE 
            const response = await Axios.post('/api/dialogflow/textQuery', textQueryVariables)

            for (let content of response.data.fulfillmentMessages) {

                conversation = {
                    who: 'bot',
                    content: content
                }

                dispatch(saveMessage(conversation))
            }


        } catch (error) {
            conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: " Error just occured, please check the problem"
                    }
                }
            }

            dispatch(saveMessage(conversation))


        }

    }


    const eventQuery = async (event) => {

        // We need to take care of the message Chatbot sent 
        const eventQueryVariables = {
            event
        }
        try {
            //I will send request to the textQuery ROUTE 
            const response = await Axios.post('/api/dialogflow/eventQuery', eventQueryVariables)
            for (let content of response.data.fulfillmentMessages) {

                let conversation = {
                    who: 'bot',
                    content: content
                }

                dispatch(saveMessage(conversation))
            }


        } catch (error) {
            let conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: " Error just occured, please check the problem"
                    }
                }
            }
            dispatch(saveMessage(conversation))
        }

    }
    
    const keyPressHanlder = (e) => {
        if (e.key === "Enter") {

            if (!e.target.value) {
                return alert('you need to type somthing first')
            }
            //we will send request to text query route 
            textQuery(e.target.value)
            e.target.value = "";
        }
    }

    const renderOneMessage = (message,i) => {
        console.log('message', message,i)

        // we need to give some condition here to separate message kinds 

        // template for normal text 
        if (message.content && message.content.text && message.content.text.text) {
            return <Message key={i} who={message.who} text={message.content.text.text} />
        }
        //template for card text 
         else if (message.content && message.content.payload) {

           //const AvatarSrc = message.who === 'bot' ? "https://photos.app.goo.gl/5CnfqHvY6FbtiEay6" : "https://photos.app.goo.gl/7qt3BY5ns4sDhpAy9"

            return (<div key={i}>
                <AndroidIcon />
               <dd>{message.who}</dd>
               <div style={{ width:300,padding: '1rem',border: '3px solid black', borderRadius: '7px'}} >
               <a  target="_blank" rel="noopener noreferrer" href={message.content.payload.fields.card.structValue.fields.link.stringValue}>
               <img style={{width:300,height:"auto"}} alt="" src={message.content.payload.fields.card.structValue.fields.image.stringValue} />
               <dd>{message.content.payload.fields.card.structValue.fields.stack.stringValue}</dd>
               <dd>{message.content.payload.fields.card.structValue.fields.description.stringValue}</dd>
                </a>
               <dd> <a target="_blank" rel="noopener noreferrer" href={message.content.payload.fields.card.structValue.fields.link.stringValue}>...</a></dd>
               
               </div>
             </div>
             /*   <div style={{ padding: '1rem' }}>
                <dd>{message.who}</dd>
                {renderCards(message.content.payload.fields.card.structValue.fields)}
                </div>*/
            )
        }
    }
    const renderMessage = (returnedMessages) => {

        if (returnedMessages) {
            return returnedMessages.map((message, i) => {
                return renderOneMessage(message,i);})
            
        } else {
            return null;
        }
    }
    return (<div><LocalHospitalRoundedIcon style={{color:"green"}} /> <h1>HI! IM YOUR HEALTH ASSISTANT</h1>
        <div style={{
             height: 700, width: 700,
             border: '3px solid black', borderRadius: '7px'
            
        }}>
           
           
            <div style={{height: 644, width: '100%', overflow: 'auto' }}>


                {renderMessage(messagesFromRedux)}


            </div>
            <input
                style={{
                    margin: 0, width: '100%', height: 50,
                    borderRadius: '4px', padding: '5px', fontSize: '1rem'
                }}
                placeholder="Send a message..."
                onKeyPress={keyPressHanlder}
                type="text"
            />
            </div>      
        </div>
    )
}

export default Chatbot;
