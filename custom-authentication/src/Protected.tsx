import Container from "./Container";
import protectedRoute from "./protectedRoute";

const Protected = (props:any)=>{
    return (
        <Container>
            <h1>Protected route</h1>
        </Container>
    )
}

export default protectedRoute(Protected);