import React, {useEffect, useState} from 'react';
import './App.css';
import {API} from "aws-amplify";

type CoinInfo = {
    name: string;
    symbol: string;
    price_usd: string;
}

function App() {
    const [coins, updateCoins] = useState<CoinInfo[]>([])
    const [input, updateInput] = useState({limit: 5, start: 0})

    const updateInputValues = (type:string, value:string) => {
        updateInput({...input, [type]: value})
    }

    async function fetchCoins() {
        const {limit, start} = input
        const data = await API.get('cryptoapi', `/coins?limit=${limit}&start=${start}`, {});
        updateCoins(data.coins)
    }

    useEffect(() => {
        fetchCoins();
    }, [])

    return (
        <div className={"App"}>
            <input
                type="text"
                placeholder={"limit"}
                onChange={e=>{updateInputValues('limit',e.target.value)}}
            />
            <input
                type="text"
                placeholder={"start"}
                onChange={e=>{updateInputValues('start',e.target.value)}}
            />
            <button onClick={fetchCoins}>Fetch Coins</button>
            {
                coins.map((coin, index) => (
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
