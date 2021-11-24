import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {AmplifyGreetings, AmplifySignOut, withAuthenticator} from "@aws-amplify/ui-react";
import {Auth} from "aws-amplify";
import {CognitoUser} from "amazon-cognito-identity-js";

function App() {
    const [user,setUser] = useState<CognitoUser|null>(null);
    const checkUser = async ()=>{
        await Auth.currentAuthenticatedUser()
            .then((user:CognitoUser)=>{
                setUser(user)
            })
    }

    useEffect(()=>{
        checkUser();
    },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
        {user &&
        <AmplifyGreetings username={user.getUsername()}/>
        }
    </div>
  );
}

export default withAuthenticator(App);
