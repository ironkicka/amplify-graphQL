import {styles} from "./Form";
import Button from "./Button";
import React from "react";

const ForgotPasswordSubmit = ({forgotPasswordSubmit, updateForm}: {
    forgotPasswordSubmit: () => void,
    updateForm:(e:React.ChangeEvent<HTMLInputElement>)=>void;
}) => {
    return (
        <div style={styles.container}>
            <input
                name={'confirmationCode'}
                onChange={e => {
                    e.persist();
                    updateForm(e)
                }}
                style={styles.input}
                placeholder={'Confirmation Code'}
            />
            <input
                name={'password'}
                onChange={e => {
                    e.persist();
                    updateForm(e)
                }}
                style={styles.input}
                placeholder={'New Password'}
                type={"password"}
            />
            <Button onClick={forgotPasswordSubmit} title={'Save new password'}/>
        </div>
    )
}

export default ForgotPasswordSubmit;