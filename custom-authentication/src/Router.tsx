import {HashRouter, Route, Routes} from "react-router-dom";
import Nav from "./Nav";
import Public from "./Public";
import Protected from "./Protected";
import Profile from "./Profile";

const Router = ()=>{
    return (
        <HashRouter>
            <Nav/>
            <Routes>
                <Route path={"/"} element={<Public/>}/>
                <Route path={"/protected"} element={<Protected/>}/>
                <Route path={"/profile"} element={<Profile/>}/>
                <Route element={<Public/>}/>
            </Routes>
        </HashRouter>
    )
}

export default Router;