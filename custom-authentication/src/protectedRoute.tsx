import {Auth} from "aws-amplify";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

interface ProtectedRouteProps {
    route: string;
}

const protectedRoute =
    <P extends object>(Component: React.ComponentType<P>): React.FC<P & ProtectedRouteProps> => ({route='/profile',...props}: ProtectedRouteProps)=>{
    // let navigate = useNavigate();
    const checkAuthState = async () => {
        try {
            await Auth.currentAuthenticatedUser()
        } catch (e) {
            window.location.hash = route;
        }
    }
    useEffect(() => {
        checkAuthState()
    }, [])

    return (
        <Component {...props as P}/>
    )
}

export default protectedRoute;