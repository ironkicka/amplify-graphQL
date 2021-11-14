import Button from "./Button";
import React from "react";
import {styles} from "./Form";

const SignIn = ({signIn,updateForm}:{
    signIn:()=>void,
    updateForm:(e:React.ChangeEvent<HTMLInputElement>)=>void;
})=>{
    return (
        <div style={styles.container}>
            <input
                name={'username'}
                onChange={e=>{e.persist();updateForm(e)}}
                style={styles.input}
                placeholder={'username'}
            />
            <input
                type={'password'}
                name={'password'}
                onChange={e=>{e.persist();updateForm(e)}}
                style={styles.input}
                placeholder={'password'}
            />
            <Button onClick={signIn} title={'Sign In'}/>
        </div>
    )
}
export default SignIn;