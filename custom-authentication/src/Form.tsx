import React, {SetStateAction, useState} from "react";
import {Auth} from "aws-amplify";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ConfirmSignUp from "./ConfirmSignUp";
import ForgotPassword from "./ForgotPassword";
import ForgotPasswordSubmit from "./ForgotPasswordSubmit";

type FormType =
    'signIn'|
    'confirmSignUp'|
    'forgotPassword'|
    'forgotPasswordSubmit'|
    'signUp'

export type FormInput ={
    username:string;
    password:string;
    email:string;
    confirmationCode:string;
}

type CognitoUserInfo = {
    username: string,
    email: string,
    phone_number: string,
    [key: string]: string
}

type SingIn = {
    formInputs:Pick<FormInput,'username'|'password'>
    setUser: React.Dispatch<React.SetStateAction<CognitoUserInfo|null>>
}

type SingUp = {
    formInputs:Pick<FormInput,'username'|'password'|'email'>
    updateFormType: React.Dispatch<React.SetStateAction<FormType>>
}

type ConfirmSignUpArgs = {
    formInputs:Pick<FormInput,'username'|'confirmationCode'>
    updateFormType: React.Dispatch<React.SetStateAction<FormType>>
}

type ForgotPasswordArgs = {
    formInputs:Pick<FormInput,'username'>
    updateFormType: React.Dispatch<React.SetStateAction<FormType>>
}

type ForgotPasswordSubmitArgs = {
    formInputs:Pick<FormInput,'username'|'confirmationCode'|'password'>
    updateFormType: React.Dispatch<React.SetStateAction<FormType>>
}

const signIn = async ({formInputs,setUser}:SingIn)=>{
    try {
        const user = await Auth.signIn({
            username:formInputs.username,
            password:formInputs.password,
        })
        const userInfo = {username:user.username,...user.attributes}
        console.log('sign in success');
        setUser(userInfo)
    }catch (err){
        console.log('error signing in..',err)
    }
}

const signUp = async ({formInputs,updateFormType}:SingUp)=>{
    try {
        await Auth.signUp({
            username:formInputs.username,
            password:formInputs.password,
            attributes:{email:formInputs.email}
        })
        console.log('sign up success');
        updateFormType('confirmSignUp')
    }catch (err){
        console.log('error signing up..',err)
    }
}

const confirmSignUp = async ({formInputs,updateFormType}:ConfirmSignUpArgs)=>{
    try {
        await Auth.confirmSignUp(formInputs.username,formInputs.confirmationCode)
        updateFormType('signIn')
    }catch (err){
        console.log('error signing up..',err)
    }
}

const forgotPassword = async ({formInputs,updateFormType}:ForgotPasswordArgs)=>{
    try {
        await Auth.forgotPassword(formInputs.username)
        updateFormType('forgotPasswordSubmit')
    }catch (err){
        console.log('error submitting username to reset password...',err)
    }
}

const forgotPasswordSubmit = async ({formInputs,updateFormType}:ForgotPasswordSubmitArgs)=>{
    try {
        await Auth.forgotPasswordSubmit(formInputs.username,formInputs.confirmationCode,formInputs.password)
        updateFormType('signIn')
    }catch (err){
        console.log('error updating password...',err)
    }
}

const initialFormState = {
    username:'',
    password:'',
    email:'',
    confirmationCode:''
}

const styles = {
    container:{
        display:'flex',
        flexDirection:'column'as const,
        marginTop:30,
        justifyContent:'center',
        alignItems:'center'
    },
    input:{
        height:45,
        marginTop:8,
        width:300,
        maxWidth:300,
        padding:'0px 8px',
        fontSize:16,
        outline:'none',
        border:'none',
        borderBottom:'2px solid rgba(0,0,0,.3)'
    },
    toggleForm:{
        fontWeight:600,
        padding:'0px 25px',
        marginTop:15,
        marginBottom:0,
        textAlign:'center' as const,
        color:'rgba(0,0,0,0.6)'
    },
    resetPassword:{
        marginTop:5,
    },
    anchor:{
        color:'#006bfc',
        cursor:'pointer',
    }
}

const Form = ({setUser}:{setUser:React.Dispatch<React.SetStateAction<CognitoUserInfo|null>>})=>{
    const [formType,updateFormType] = useState<FormType>('signIn');
    const [formState,updateFormState] = useState<FormInput>(initialFormState);

    const updateForm = (event:any)=>{
        const newFormState = {
            ...formState,[event.target.name]:event.target.value
        }
        updateFormState(newFormState)
    }
    const renderForm = ()=>{
        switch(formType){
            case 'signUp':
                return(
                    <SignUp
                        signUp={()=>signUp({formInputs:formState,updateFormType})}
                        updateForm={updateForm}
                    />
                )
            case 'confirmSignUp':
                return(
                    <ConfirmSignUp
                        confirmSignUp={()=>confirmSignUp({formInputs:formState,updateFormType})}
                        updateForm={updateForm}
                    />
                )
            case 'signIn':
                return(
                    <SignIn
                        signIn={()=>signIn({formInputs:formState,setUser})}
                        updateForm={updateForm}
                    />
                )
            case 'forgotPassword':
                return(
                    <ForgotPassword
                        forgotPassword={()=>forgotPassword({formInputs:formState,updateFormType})}
                        updateForm={updateForm}
                    />
                )
            case 'forgotPasswordSubmit':
                return(
                    <ForgotPasswordSubmit
                        forgotPasswordSubmit={()=>forgotPasswordSubmit({formInputs:formState,updateFormType})}
                        updateForm={updateForm}
                    />
                )
            default:
                return null;
        }
    }
    return(
        <div>
            {renderForm()}
            {formType === 'signUp' &&(
                <p
                    style={styles.toggleForm}
                >Already have an account?
                    <span
                        style={styles.anchor}
                        onClick={()=>{updateFormType('signIn')}}
                    >
                        Sign In
                    </span>
                </p>
            )}
            {formType === 'signIn' && (
                <>
                    <p
                        style={styles.toggleForm}
                    >Need an account?
                        <span
                            style={styles.anchor}
                            onClick={()=>{updateFormType('signUp')}}
                        >
                        Sign Up
                    </span>
                    </p>
                    <p
                        style={{...styles.toggleForm,...styles.resetPassword}}
                    >Forgot your password?
                        <span
                            style={styles.anchor}
                            onClick={()=>{updateFormType('forgotPassword')}}
                        >
                        Reset Password
                    </span>
                    </p>
                </>
            )}
        </div>
    )
}

export {styles,Form}