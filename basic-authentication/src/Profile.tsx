import {useEffect, useState} from "react";
import {Auth} from "aws-amplify";
import Container from "./Container";
import {AmplifyAuthenticator, AmplifySignIn, AmplifySignOut, withAuthenticator} from "@aws-amplify/ui-react";

type UserInfo = {
    username: string,
    email: string,
    phone_number: string,
    [key: string]: string
}

const Profile = () => {
    useEffect(() => {
        checkUser();
    }, [])

    const [user, setUser] = useState<UserInfo>({} as UserInfo);

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

export default Profile;