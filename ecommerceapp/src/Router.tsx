import {HashRouter, Route, Routes} from "react-router-dom";
import Nav from "./Nav";
import Profile from "./Profile";
import Admin from "./Admin";
import Main from "./Main";

const Router = ()=>{
    return (
        <HashRouter>
            <Nav/>
            <Routes>
                <Route path={"/"} element={<Main/>}/>
                <Route path={"/admin"} element={<Admin/>}/>
                <Route path={"/profile"} element={<Profile/>}/>
                <Route element={<Main/>}/>
            </Routes>
        </HashRouter>
    )
}

export default Router;