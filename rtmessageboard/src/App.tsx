import React, {useEffect, useState} from 'react';
import './App.css';
import {Button, Input} from "antd";
import {ColorChangeHandler, SketchPicker} from 'react-color'
import {DataStore} from "@aws-amplify/datastore";
import {Message} from './models'

type FormState = {
  color:string;
  title:string;
}

const initialState:FormState = {
  color:'#000000',
  title:''
}
function App() {
  const [formState,updateFormState] = useState<FormState>(initialState);
  const [messages,updateMessages] = useState<Message[]>([]);
  const [showPicker,updateShowPicker] = useState(false);

  useEffect(()=>{
    fetchMessages();
    const subscription = DataStore.observe(Message).subscribe(()=>fetchMessages())
    return ()=>subscription.unsubscribe();
  },[])
  const fetchMessages = async ()=>{
    const messages = await DataStore.query(Message)
    updateMessages(messages)
  }
  const onColorChange:ColorChangeHandler = (e)=>{
    updateFormState({...formState,color:e.hex})
  }

  const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
      updateFormState({...formState,[e.target.name]:e.target.value})
  }

  const createMessage = async()=>{
    if(!formState.title) return
    await DataStore.save(new Message({...formState}))
    updateFormState(initialState)
  }

  return (
   <div style={container}>
     <h1 style={heading}>Real Time Message Board</h1>
     <Input
         onChange={onChange}
         name={"title"}
         placeholder={"Message title"}
         value={formState.title}
         style={input}
     />
     <div>
       <Button
           onClick={()=>updateShowPicker(!showPicker)}
           style={button}
       >
         Toggle Color Picker
       </Button>
       <p>Color:
         <span style={{fontWeight:'bold',color:formState.color}}>
           {formState.color}
         </span>
       </p>
     </div>
     {showPicker &&(
         <SketchPicker
             color={formState.color}
             onChange={onColorChange}
         />
     )}
     <Button type={"primary"} onClick={createMessage}>
       Create Message
     </Button>
     {messages.map((message)=>(
         <div
             key={message.id}
             style={{...messageStyle,backgroundColor:message.color}}
         >
           <div style={messageBg}>
             <p style={messageTitle}>{message.title}</p>
           </div>
         </div>
     ))}
   </div>
  );
}

const container = {width:'100%',padding:40,maxWidth:900}
const input={marginBottom:10};
const button = { marginBottom: 10};
const heading = {fontWeight:'normal',fontSize:40}
const messageBg = {backgroundColor:'white'}
const messageStyle={padding:'20px',marginTop:7,borderRadius:4}
const messageTitle = {margin:0,padding:9,fontSize:20}
export default App;
