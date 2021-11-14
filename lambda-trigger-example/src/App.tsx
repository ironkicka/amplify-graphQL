import React, {useEffect, useState} from 'react';
import './App.css';
import {Auth} from "aws-amplify";
import {CognitoIdToken, CognitoUserSession} from "amazon-cognito-identity-js";
import {AmplifySignOut, withAuthenticator} from "@aws-amplify/ui-react";

type UserInfo = {
  username: string,
  email: string,
  phone_number: string,
  signInUserSession:CognitoUserSession &{idToken:CognitoIdToken},
} &{[key: string]: string}

function App() {
  const [user,updateUser] = useState<UserInfo|null>(null);
  useEffect(()=>{
    Auth.currentAuthenticatedUser()
        .then(user =>updateUser(user))
        .catch(err => console.log(err));
  },[])

  let isAdmin = false;

  if(user){
    const {signInUserSession:{idToken:{payload}}}= user;
    if(
        payload['cognito:groups']&&
        payload['cognito:groups'].includes('Admin')
    ){
      isAdmin = true;
    }
  }
  return (
    <div className="App">
      <header>
        <h1>Hello World</h1>
        {isAdmin && <p>Welcome,Admin</p>}
      </header>
      <AmplifySignOut/>
    </div>
  );
}

export default withAuthenticator(App);
