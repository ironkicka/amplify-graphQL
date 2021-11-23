import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {API} from "aws-amplify";
import {getPerformance} from "./graphql/queries";
import {GraphQLResult } from '@aws-amplify/api-graphql'
import {PerformanceType} from "./type";

const Performance = ()=>{
    const [performance,setPerformance] = useState<PerformanceType|null>(null);
    const [loading,setLoading] = useState(true);
    let {id}=useParams();

    useEffect(()=>{
        fetchPerformanceInfo()
    },[])

    const fetchPerformanceInfo = async ()=>{
        try{
            const talkInfo = await API.graphql({
                query:getPerformance,
                variables:{id},
                authMode:'API_KEY'
            }) as GraphQLResult<any>
            if(talkInfo.data.getPerformance){
                setPerformance(talkInfo.data.getPerformance)
                setLoading(false)
            }
        }catch (err){
            console.log('error fetching talk info...',err);
            setLoading(false)
        }
    }
    return(
        <div>
            <p>Performance</p>
            {loading && <h3>Loading...</h3>}
            {
                performance &&(
                    <div>
                        <h1>{performance.performer}</h1>
                        <h3>{performance.time}</h3>
                        <p>{performance.description}</p>
                    </div>
                )
            }
        </div>
    )
}

export default Performance;