import Button from "./Button";
import React from "react";
import {styles} from "./Form";

const ConfirmSignUp = ({confirmSignUp,updateForm}:{
    confirmSignUp:()=>void,
    updateForm:(e:React.ChangeEvent<HTMLInputElement>)=>void;
})=>{
    return (
        <div style={styles.container}>
            <input
                name={'confirmationCode'}
                onChange={e=>{e.persist();updateForm(e)}}
                style={styles.input}
                placeholder={'confirmationCode'}
            />
            <Button onClick={confirmSignUp} title={'Confirm Sign Up'}/>
        </div>
    )
}
export default ConfirmSignUp;