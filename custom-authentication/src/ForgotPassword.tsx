import Button from "./Button";
import React from "react";
import {styles} from "./Form";

const ForgotPassword = ({forgotPassword,updateForm}:{
    forgotPassword:()=>void,
    updateForm:(e:React.ChangeEvent<HTMLInputElement>)=>void;
})=>{
    return (
        <div style={styles.container}>
            <input
                name={'username'}
                onChange={e=>{e.persist();updateForm(e)}}
                style={styles.input}
                placeholder={'Username'}
            />
            <Button onClick={forgotPassword} title={'Reset Password'}/>
        </div>
    )
}
export default ForgotPassword;