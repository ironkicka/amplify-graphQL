import {Menu} from "antd";
import {Link, useLocation} from "react-router-dom";
import {HomeOutlined,ProfileOutlined,FileProtectOutlined} from '@ant-design/icons';
import {useEffect, useState} from "react";

const Nav = ()=>{
    let location = useLocation();
    const [current,setCurrent]=useState('home');

    const setRoute = () => {
        const pathname = location.pathname.split('/')[1];
        setCurrent(pathname?pathname:'home');
    }

    useEffect(()=>{
        setRoute();
    },[location]);

    return(
        <div>
            <Menu selectedKeys={[current]} mode="horizontal">
                <Menu.Item key={'home'}>
                    <Link to={'/'}>
                        <HomeOutlined/>Home
                    </Link>
                </Menu.Item>
                <Menu.Item key={'profile'}>
                    <Link to={'/profile'}>
                        <ProfileOutlined/>Profile
                    </Link>
                </Menu.Item>
                <Menu.Item key={'protected'}>
                    <Link to={'/protected'}>
                        <FileProtectOutlined/>Protected
                    </Link>
                </Menu.Item>
            </Menu>
        </div>
    )

}

export default Nav;