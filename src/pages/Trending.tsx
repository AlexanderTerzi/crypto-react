import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { fetchTrendData, selectTrendData } from '../redux/slices/trendDataSlice';

import Spinner from '../components/UI/Spinner';
import ErrorBlock from '../components/ErrorBlock';
import TrendingItem from '../components/TrendingItem';

interface ITrendingData {
    item: {
        id: string;
        name: string;
        small: string;
        market_cap_rank: string;
        price_btc: number;
        score: number;
        large: string;
    };
}

const Trending: React.FC = () => {
    const dispatch = useAppDispatch();

    const { trendData, status } = useSelector(selectTrendData);

    const getTrendData = async () => {
        dispatch(fetchTrendData(''));
    }

    useEffect(() => {
        getTrendData();
    }, []);

    return (
        <section className='w-[80%] h-full flex-col mt-16 mb-24 relative md:mt-8'>
            <div className='w-full min-h-[60vh] py-8 flex flex-wrap justify-evenly border border-gray-100 rounded'>
                {
                    trendData.length !== 0 && status !== 'loading' && trendData.coins.map((item: ITrendingData) =>
                        <TrendingItem data={item.item} key={item.item.id} />
                    )
                }
                {status === 'loading' && <Spinner classes={'w-full min-h-[60vh] h-full flex justify-center flex-col items-center'} />}
                {status === 'error' && <ErrorBlock />}
            </div>
            <Outlet />
        </section>
    );
};

export default Trending;