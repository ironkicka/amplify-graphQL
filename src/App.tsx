import React, {useEffect, useState} from 'react';
import './App.css';
import {API} from "aws-amplify";

type CoinInfo = {
    name:string;
    symbol:string;
    price_usd:string;
}

function App() {
    const [coins, updateCoins] = useState<CoinInfo[]>([])

    async function fetchCoins(){
        const data = await API.get('cryptoapi','/coins',{});
        updateCoins(data.coins)
    }

    useEffect(()=>{
        fetchCoins();
    },[])

    return (
        <div className={"App"}>
            {
                coins.map((coin,index)=>(
                    <div key={index}>
                        <h2>{coin.name} - {coin.symbol}</h2>
                        <h5>${coin.price_usd}</h5>
                    </div>
                ))
            }
        </div>
    );
}

export default App;
