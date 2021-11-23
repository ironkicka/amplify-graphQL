import Container from "./Container";
import {List} from "antd";
import {useEffect, useState} from "react";
import checkUser from "./checkUser";
import {API} from "aws-amplify";
import {User} from "./type";

type Item = {
    id:string;
    name:string;
    price:string
}

type Model = {
    products:Item[],
    loading:boolean
}
const Main = ()=>{
    const [state,setState] = useState<Model>({products:[],loading:true})
    const [user,updateUser] = useState<User|undefined|null>(null);
    let didCancel = false;

    useEffect(()=>{
        getProducts();
        checkUser(updateUser)
        return ()=>{didCancel=true}
    },[])

    const getProducts = async ()=>{
        const data = await API.get('ecommerceapi','/products',{})
        console.log('data: ',data)
        if(didCancel)return
        setState({
            products: data.data.Items,loading: false
        })
    }

    const deleteItem = async (id:string)=>{
        try{
            const products = state.products.filter(p=>p.id!==id)
            setState({...state,products})
            await API.del('ecommerceapi','/products',{body:{id}});
            console.log('succcessfully deleted item')
        }catch (err){
            console.log('error: ',err);
        }
    }
    return(
        <Container>
            <List
                itemLayout={"horizontal"}
                dataSource={state.products}
                loading={state.loading}
                renderItem={(item:Item)=>(
                    <List.Item
                        actions={(user !==null && user !==undefined && user.isAuthorized )?
                                [<p onClick={()=>deleteItem(item.id)} key={item.id}>delete</p>]:[<></>]
                        }
                    >
                        <List.Item.Meta
                            title={item.name}
                            description={item.price}
                        />
                    </List.Item>
                )}
            >
            </List>
        </Container>
    )
}

export default Main;