import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

import TrendingItem from '../components/TrendingItem';

const Trending = () => {
    const [trendData, setTrendData] = useState();

    const getTrendData = async () => {
        try {
            const { data } = await axios.get
                (`https://api.coingecko.com/api/v3/search/trending`)
            setTrendData(data);
        } catch (error) {
            console.log(error);
            alert('Server error')
        }
    }

    useEffect(() => {
        getTrendData();

    }, []);

    return (
        <section className='w-[80%] h-full flex-col mt-16 mb-24 relative'>
            <div className='w-full min-h-[60vh] py-8 flex flex-wrap justify-evenly border border-gray-100 rounded'>
                {trendData && trendData.coins.map((item) =>
                    <TrendingItem data={item.item} key={item.item.id} />
                )}
            </div>
            <Outlet />
        </section>
    );
};

export default Trending;