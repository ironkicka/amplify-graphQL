import {useEffect, useState} from "react";
import {Menu} from "antd";
import {Link, useLocation} from "react-router-dom";
import {HomeOutlined} from '@ant-design/icons';


const Nav = () => {
    let location = useLocation();
    const [current,setCurrent]=useState('home');
    const setRoute = () => {
        const pathname = location.pathname.split('/')[1];
        setCurrent(pathname?pathname:'home');
    }
    useEffect(()=>{
        setRoute();
    },[location]);

    return (
        <div>
            <Menu selectedKeys={[current]} mode={"horizontal"}>
                <Menu.Item key={'home'}>
                    <Link to={'/'}>
                        <HomeOutlined/>Home
                    </Link>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default Nav;