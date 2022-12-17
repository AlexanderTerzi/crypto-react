import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, setCryptoData } from '../redux/slices/coinsSlice';
import { selectFilters, setTotalPages } from '../redux/slices/filtersSlice';
import { selectTheme } from '../redux/slices/themeSlice';

import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import Languages from '../components/Languages.jsx';
import Theme from '../components/Theme';

const Home = () => {
    const dispatch = useDispatch();

    const { currency, sortBy, page, itemsPerPage, coinSearch } = useSelector(selectFilters);
    const { darkTheme } = useSelector(selectTheme);

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
        <main className={`${!darkTheme ? 'text-gray-300 bg-dirty_white-100' : 'text-white '} w-full h-full flex flex-col content-center items-center relative font-RobotoCondensed`}>
            <div className='w-screen h-screen bg-gray-300 fixed -z-10'></div>
            <Logo />
            <div className='ml-auto mr-3 mt-4 flex items-center sm:flex-col'>
                <Theme />
                <Languages />
            </div>
            <Navigation />

            <Outlet />
        </main>
    );
};

export default Home;