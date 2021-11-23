import {List} from "antd";
import {Link} from "react-router-dom";
import {PerformanceType} from "./type";
import {useEffect, useState} from "react";
import {API} from "aws-amplify";
import {listStages} from "./graphql/queries";
import {GraphQLResult} from "@aws-amplify/api-graphql";

type Stage = {
    id:string;
    name:string;
    performances:{
        items:PerformanceType[]
    }
}
const Home = () => {
    const [stages,setStages] = useState<Stage[]>([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        getStages();
    },[])
    const getStages = async()=>{
        const apiData = await API.graphql({
            query:listStages,
            authMode:'API_KEY'
        }) as GraphQLResult<{listStages:{items:Stage[]}}>
        const items = apiData.data?.listStages.items;
        if(items!==undefined){
            setLoading(false)
            setStages(items)
        }
    }
    return (
        <div>
            <h1 style={heading}>Stages</h1>
            {loading && <h2>Loading...</h2>}
            {stages.map((stage) => (
                <div key={stage.id} style={stageInfo}>
                    <p style={infoHeading}>{stage.name}</p>
                    <p style={infoTitle}>Performances</p>
                    <List
                        itemLayout={"horizontal"}
                        dataSource={stage.performances.items}
                        renderItem={(performance) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={<Link style={performerInfo}
                                                 to={`/performances/${performance.id}`}>{performance.performer}</Link>}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            ))}
        </div>
    )
}

const heading = {fontSize: 44, fontWeight: 300, marginBottom: 5};
const stageInfo = {padding:'20ppx 0px 10px',borderBottom:'2px solid #ddd'};
const infoTitle = {fontWeight:'bold',fontSize:18};
const infoHeading = {fontSize:30,marginBottom:5};
const performerInfo = {fontSize:24}

export default Home;