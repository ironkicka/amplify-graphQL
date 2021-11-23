import {Auth} from 'aws-amplify';
import React from "react";
import {User} from "./type";

const checkUser = async (updateUser: React.Dispatch<React.SetStateAction<User|undefined|null>>)=>{
    const userData= await Auth
        .currentSession()
        .catch((err:string) => console.log('error: ',err));

    if(!userData){
        console.log('userData: ',userData);
        updateUser(null)
        return
    }

    const {payload} = userData.getIdToken();
    const isAuthorized = payload['cognito:groups'] && payload['cognito:groups'].includes('Admin');
    updateUser({
        username:payload['cognito:username'],
        isAuthorized
    })
}

export default checkUser;