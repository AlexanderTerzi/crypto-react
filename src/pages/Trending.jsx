import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendData, selectTrendData } from '../redux/slices/trendDataSlice';

import Spinner from '../components/UI/Spinner';
import ErrorBlock from '../components/ErrorBlock';
import TrendingItem from '../components/TrendingItem';

const Trending = () => {
    const dispatch = useDispatch();

    const { trendData, status } = useSelector(selectTrendData);

    const getTrendData = async () => {
        dispatch(fetchTrendData());
    }

    useEffect(() => {
        getTrendData();
    }, []);

    return (
        <section className='w-[80%] h-full flex-col mt-16 mb-24 relative md:mt-8'>
            <div className='w-full min-h-[60vh] py-8 flex flex-wrap justify-evenly border border-gray-100 rounded'>
                {
                    trendData.length !== 0 && status !== 'loading' && trendData.coins.map((item) =>
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