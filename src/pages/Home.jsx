import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, setCryptoData } from '../redux/slices/coinsSlice';
import { setTotalPages } from '../redux/slices/filtersSlice';

import Logo from '../components/Logo';
import Navigation from '../components/Navigation';


const Home = () => {
    const dispatch = useDispatch();

    const { currency, sortBy, page, itemsPerPage, coinSearch } = useSelector(state => state.filters);

    useEffect(() => {
        const getCryptoData = async () => {

            setCryptoData();
            dispatch(fetchItems({ currency, coinSearch, sortBy, itemsPerPage, page }))
        }

        const getTotalNumber = async () => {
            try {
                // const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/list`);
                // setTotalPages(data.length)
                dispatch(setTotalPages(2770))
            } catch (error) {
                console.log(error);
                alert('Server error')
            }
        }

        getTotalNumber();
        getCryptoData();

    }, [coinSearch, currency, sortBy, page, itemsPerPage]);

    return (
        <main className='w-full h-full flex flex-col content-center items-center relative text-white font-RobotoCondensed'>
            <div className='w-screen h-screen bg-gray-300 fixed -z-10'></div>
            <Logo />
            <Navigation />

            <Outlet />
        </main>
    );
};

export default Home;