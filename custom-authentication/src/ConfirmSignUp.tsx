import Button from "./Button";
import React from "react";
import {styles} from "./Form";

const ConfirmSignUp = ({confirmSignUp,updateFormState}:{confirmSignUp:()=>void,updateFormState:React.SetStateAction<any>})=>{
    return (
        <div style={styles.container}>
            <input
                name={'confirmationCode'}
                onChange={e=>{e.persist();updateFormState(e)}}
                style={styles.input}
                placeholder={'confirmationCode'}
            />
            <Button onClick={confirmSignUp} title={'Confirm Sign Up'}/>
        </div>
    )
}
export default ConfirmSignUp;