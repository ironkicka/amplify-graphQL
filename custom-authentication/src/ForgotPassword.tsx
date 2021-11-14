import Button from "./Button";
import React from "react";
import {styles} from "./Form";

const ForgotPassword = ({forgotPassword,updateFormState}:{forgotPassword:()=>void,updateFormState:React.SetStateAction<any>})=>{
    return (
        <div style={styles.container}>
            <input
                name={'username'}
                onChange={e=>{e.persist();updateFormState(e)}}
                style={styles.input}
                placeholder={'Username'}
            />
            <Button onClick={forgotPassword} title={'Reset Password'}/>
        </div>
    )
}
export default ForgotPassword;