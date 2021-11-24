import React, {useState} from "react";
import {Button, Input} from "antd";
import {API,graphqlOperation,Storage} from "aws-amplify";
import {v4 as uuid} from 'uuid';
import {createPost} from "./graphql/mutations";
import {viewState} from "./App";

type FormState = {
    title:string;
    image:File|null;
}
const initialFormState:FormState = {
    title:'',
    image:null
}

const CreatePost = ({updateViewState}:{updateViewState: React.Dispatch<React.SetStateAction<viewState>>})=>{
    const [formState,updateFormState] = useState(initialFormState)

    const onChange = (key:string,value:string)=>{
        updateFormState({...formState,[key]:value})
    }

    const setPhoto = (e: React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){
            if(!e.target.files[0]) return
            const file =e.target.files[0]
            updateFormState({...formState,image:file})
        }
    }

    const savePhoto = async ()=>{
        const {title,image} = formState;
        if(!title||!image||!image.name) return;
        const imageKey = uuid() + image.name.replace(/\s/g,'-').toLowerCase();
        await Storage.put(imageKey,image)
        const post = {title,imageKey}
        await API.graphql(graphqlOperation(createPost,{input:post}))
        updateViewState('viewPosts')
    }
    return(
        <div>
            <h2 style={heading}>Add Photo</h2>
            <Input
                onChange={e=>onChange('title',e.target.value)}
                style={withMargin}
                placeholder={"Title"}
            />
            <Input
                type={'file'}
                onChange={setPhoto}
                style={button}
            />
            <Button style={button} type={"primary"} onClick={savePhoto}>
                Save Photo
            </Button>
        </div>
    )
}

const heading = {margin:'20px 0px'};
const withMargin = {marginTop:10}
const button = {marginTop:10}

export default CreatePost;