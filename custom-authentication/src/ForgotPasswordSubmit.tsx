import {styles} from "./Form";
import Button from "./Button";
import React from "react";

const ForgotPasswordSubmit = ({forgotPasswordSubmit,updateFormState}:{forgotPasswordSubmit:()=>void,updateFormState:React.SetStateAction<any>})=>{
    return(
        <div style={styles.container}>
            <input
                name={'confirmationCode'}
                onChange={e=>{e.persist();updateFormState(e)}}
                style={styles.input}
                placeholder={'Confirmation Code'}
            />
            <input
                name={'password'}
                onChange={e=>{e.persist();updateFormState(e)}}
                style={styles.input}
                placeholder={'New Password'}
                type={"password"}
            />
            <Button onClick={forgotPasswordSubmit} title={'Save new password'}/>
        </div>
    )
}

export default ForgotPasswordSubmit;