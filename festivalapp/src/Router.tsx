import {HashRouter, Route, Routes} from "react-router-dom";
import Nav from "./Nav";
import Container from "./Container";
import Footer from "./Footer";
import Admin from "./Admin";
import Performance from "./Performance";
import Home from "./Home";

const Router = ()=>{
    return (
        <HashRouter>
            <Nav/>
            <Container>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/performances/:id"} element={<Performance/>}/>
                <Route path={"/admin"} element={<Admin/>}/>
            </Routes>
            </Container>
            <Footer/>
        </HashRouter>
    )
}

export default Router;