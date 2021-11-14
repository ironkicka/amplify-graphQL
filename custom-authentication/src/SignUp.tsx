import Button from "./Button";
import React from "react";
import {styles} from "./Form";

const SignUp = ({signUp,updateForm}:{
    signUp:()=>void,
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
            <input
                name={'email'}
                onChange={e=>{e.persist();updateForm(e)}}
                style={styles.input}
                placeholder={'email'}
            />
            <Button onClick={signUp} title={'Sign Up'}/>
        </div>
    )
}
export default SignUp;