import React, {useEffect, useState} from 'react';
import './App.css';
import {Auth,Storage} from "aws-amplify";
import {CognitoIdToken, CognitoUserSession} from "amazon-cognito-identity-js";
import {AmplifySignOut, withAuthenticator} from "@aws-amplify/ui-react";
import {v4 as uuid} from 'uuid';
import {isDefined} from "./utils";

type UserInfo = {
  username: string,
  email: string,
  phone_number: string,
  signInUserSession:CognitoUserSession &{idToken:CognitoIdToken},
} &{[key: string]: string}

function App() {
  const [user,updateUser] = useState<UserInfo|null>(null);
  const [images,setImages]= useState<string[]>([]);
  const onChange = async (e:React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.files !==null){
      const file = e.target.files[0];
      const fileType = file.name.split('.')[file.name.split.length-1]
      await Storage.put(`${uuid()}.${fileType}`,file);
      fetchImages();
    }
  }
  const fetchImages = async ()=>{
    const files = await Storage.list('');
    const signedFiles = await Promise.all(files.map(async file=>{
      if(file.key !==undefined){
        const signedFile = await Storage.get(file.key);
        return signedFile;
      }
    }))
    setImages(signedFiles.filter(isDefined))
  }

  useEffect(()=>{
    Auth.currentAuthenticatedUser()
        .then(user =>updateUser(user))
        .catch(err => console.log(err));
    fetchImages();
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
      <input type="file" onChange={onChange}/>
      {images.map(image =>(
          <img src={image} key={image} style={{width:500}}/>
      ))}
      <AmplifySignOut/>
    </div>
  );
}

export default withAuthenticator(App);
