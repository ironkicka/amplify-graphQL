import {useEffect, useState} from "react";
import {CognitoIdToken, CognitoUserSession} from "amazon-cognito-identity-js";
import checkUser from "./checkUser";
import {Hub} from "aws-amplify";
import {Menu} from "antd";
import {Link, useLocation} from "react-router-dom";
import {HomeOutlined, UserOutlined, ProfileOutlined} from '@ant-design/icons';
import {User} from "./type";


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

    const [user, updateUser] = useState<User|undefined|null>(null);
    useEffect(() => {
        checkUser(updateUser);
        Hub.listen('auth', (data) => {
            const {payload: {event}} = data;
            console.log('event: ', event);
            if (event === 'signIn' || event == 'signOut') checkUser(updateUser)
        })
    }, [])

    return (
        <div>
            <Menu selectedKeys={[current]} mode={"horizontal"}>
                <Menu.Item key={'home'}>
                    <Link to={'/'}>
                        <HomeOutlined/>Home
                    </Link>
                </Menu.Item>
                <Menu.Item key={'profile'}>
                    <Link to={'/profile'}>
                        <UserOutlined/>Profile
                    </Link>
                </Menu.Item>
                {
                    (user !==null && user !==undefined && user.isAuthorized ) && (
                        <Menu.Item key={'admin'}>
                            <Link to={'/admin'}>
                                <ProfileOutlined/>Admin
                            </Link>
                        </Menu.Item>
                    )
                }
            </Menu>
        </div>
    )
}

export default Nav;