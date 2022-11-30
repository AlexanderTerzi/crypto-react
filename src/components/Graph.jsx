import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

import { CryptoContext } from '../pages/Home';

const typeData = [
    {
        type: 'prices',
        name: 'Prices'
    },
    {
        type: 'market_caps',
        name: 'Market caps'
    },
    {
        type: 'total_volumes',
        name: 'Total volumes'
    },
];

const daysData = [
    { day: 7, name: '7d' },
    { day: 14, name: '14d' },
    { day: 30, name: '30d' },
]

function CustomTooltip({ payload, label, active, currency }) {
    if (active && payload && payload.length > 0) {
        return (
            <div className="custom-tooltip">
                <p className="label text-sm text-white bg-gray-100 p-2 rounded">{`${label} : ${new Intl.NumberFormat("en-In", {
                    style: 'currency',
                    currency: currency
                }).format(payload[0].value)
                    }`}</p>
            </div>
        );
    }

    return null;
}

const GraphComponent = ({ data, currency, type }) => {
    return (
        <ResponsiveContainer height="90%">
            <LineChart width={400} height={400} data={data}>
                <Line type="monotone" dataKey={type} stroke="#14ffec" strokeWidth={'2px'} />
                <CartesianGrid stroke="#333" />
                <XAxis dataKey="date" hide />
                <YAxis dataKey={type} hide domain={["auto", "auto"]} />
                <Legend />
                <Tooltip content={<CustomTooltip />} currency={currency} cursor={false} wrapperStyle={{ outline: 'none' }} />
            </LineChart>
        </ResponsiveContainer>
    )
};

const Graph = ({ coinId }) => {
    let { currency } = useContext(CryptoContext);
    const [graphData, setGraphData] = useState();
    const [type, setType] = useState('prices');
    const [days, setDays] = useState(7);

    useEffect(() => {
        const getGraphData = async (coinId) => {
            try {
                const { data } = await axios.get
                    (`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`);

                const convertedData = data[type].map((item) => {
                    return {
                        date: new Date(item[0]).toLocaleDateString(),
                        [type]: item[1],
                    }
                });

                setGraphData(convertedData);
            } catch (error) {
                console.log(error);
                alert('Server error')
            }
        }
        getGraphData(coinId);

    }, [coinId, type, days])

    return (
        <div className='w-full h-[60%]'>
            <GraphComponent data={graphData} currency={currency} type={type} />
            <div className='flex'>
                {typeData && typeData.map((item, i) => {
                    return (
                        <button
                            className={`capitalize text-sm py-0.5 bg-opacity-25 px-1.5 ml-2 rounded ${type === item.type ? 'bg-cyan text-white' : 'bg-gray-200 text-cyan'}`}
                            onClick={() => setType(item.type)}>
                            {item.name}
                        </button>
                    )
                })}
                {daysData && daysData.map((item, i) => {
                    return (
                        <button
                            className={`capitalize text-sm py-0.5 bg-opacity-25 px-1.5 ml-2 rounded ${days === item.day ? 'bg-cyan text-white' : 'bg-gray-200 text-cyan'}`}
                            onClick={() => setDays(item.day)}>
                            {item.name}
                        </button>
                    )
                })}
            </div>
        </div>
    );
};

export default Graph;