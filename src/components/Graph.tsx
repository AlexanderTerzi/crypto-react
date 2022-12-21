import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

import { useSelector } from 'react-redux';
import { selectTranslations } from '../redux/slices/languageSlice';
import { selectFilters } from '../redux/slices/filtersSlice';

interface IDaysData {
    day: number;
    name: string;
}

const daysData: IDaysData[] = [
    { day: 7, name: '7d' },
    { day: 14, name: '14d' },
    { day: 30, name: '30d' },
];

const CustomTooltip: React.FC = ({ payload, label, active, currency }: any) => {

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

interface IGraphComponent {
    data: any;
    currency: string;
    type: string;
}

const GraphComponent: React.FC<IGraphComponent> = ({ data, currency, type }) => {
    return (
        <ResponsiveContainer height="90%">
            <LineChart width={400} height={400} data={data}>
                <Line type="monotone" dataKey={type} stroke="#14ffec" strokeWidth={'2px'} />
                <CartesianGrid stroke="#333" />
                <XAxis dataKey="date" hide />
                <YAxis dataKey={type} hide domain={["auto", "auto"]} />
                <Legend />
                {/*
                  // @ts-ignore*/}
                <Tooltip content={<CustomTooltip />} currency={currency} cursor={false} wrapperStyle={{ outline: 'none' }} />
            </LineChart>
        </ResponsiveContainer>
    )
};

interface IGraphType {
    coinId: string;
}

interface IGraphData {
    date: string;
    prices: number;
}

const Graph: React.FC<IGraphType> = ({ coinId }) => {
    const t = useSelector(selectTranslations)
    const { currency } = useSelector(selectFilters);

    const [graphData, setGraphData] = useState<IGraphData[]>();
    const [type, setType] = useState('prices');
    const [days, setDays] = useState(7);

    const typeData = t.graphTypeData;

    useEffect(() => {
        const getGraphData = async (coinId: string) => {
            try {
                const { data } = await axios.get
                    (`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`);

                const convertedData = data[type].map((item: number[]) => {
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
        <div className='w-full h-[350px] lg:hidden'>
            <GraphComponent data={graphData} currency={currency} type={type} />
            <div className='flex'>
                {typeData && typeData.map((item: { type: string; name: string }) => {
                    return (
                        <button
                            className={`capitalize text-sm py-0.5 bg-opacity-25 px-1.5 ml-2 rounded ${type === item.type ? 'bg-cyan text-white' : 'bg-gray-200 text-cyan'}`}
                            onClick={() => setType(item.type)}
                            key={item.type}
                        >
                            {item.name}
                        </button>
                    )
                })}
                {daysData && daysData.map((item) => {
                    return (
                        <button
                            className={`capitalize text-sm py-0.5 bg-opacity-25 px-1.5 ml-2 rounded ${days === item.day ? 'bg-cyan text-white' : 'bg-gray-200 text-cyan'}`}
                            onClick={() => setDays(item.day)}
                            key={item.day}
                        >
                            {item.name}
                        </button>
                    )
                })}
            </div>
        </div>
    );
};

export default Graph;