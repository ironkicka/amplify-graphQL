import {useEffect, useState} from "react";
import {Auth, Hub} from "aws-amplify";
import Container from "./Container";
import {AmplifyAuthenticator, AmplifySignOut} from "@aws-amplify/ui-react";
import {Form} from "./Form";

type UserInfo = {
    username: string,
    email: string,
    phone_number: string,
    [key: string]: string
}

const Profile = () => {
    useEffect(() => {
        checkUser();
        Hub.listen('auth',(data)=>{
            const {payload} = data;
            if(payload.event === 'signOut'){
                setUser(null)
            }
        })
    }, [])

    const [user, setUser] = useState<UserInfo|null>(null);

    const checkUser = async () => {
        try {
            const data = await Auth.currentUserPoolUser()
            const userInfo = {username: data.username, ...data.attributes}
            setUser(userInfo)
        } catch (err) {
            console.log('error: ', err)
        }
        ;
    }

    const signOut = ()=>{
        Auth.signOut().catch(err => console.log('error signing out: ',err));
    }
    if(user){
        return (
            <Container>
                <AmplifyAuthenticator
                >
                    <h1>Profile</h1>
                    <h2>Username: {user.username}</h2>
                    <h3>Email: {user.email}</h3>
                    <h4>Phone: {user.phone_number}</h4>
                    <AmplifySignOut/>
                </AmplifyAuthenticator>
            </Container>
        )
    }

    return <Form setUser={setUser}/>


}

export default Profile;