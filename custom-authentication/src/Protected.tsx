import {useEffect} from "react";
import {Auth} from "aws-amplify";
import Container from "./Container";
import {useNavigate} from "react-router-dom";

const Protected = (props:any)=>{
    let navigate = useNavigate();
    useEffect(()=>{
        Auth.currentAuthenticatedUser()
            .catch(()=>{
                navigate('/profile')
            })
    },[])

    return (
        <Container>
            <h1>Protected route</h1>
        </Container>
    )
}

export default Protected;