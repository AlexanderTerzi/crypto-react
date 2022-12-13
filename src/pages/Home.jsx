import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import ReactSwitch from 'react-switch';

import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, setCryptoData } from '../redux/slices/coinsSlice';
import { setTotalPages } from '../redux/slices/filtersSlice';

import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import { setDarkTheme } from '../redux/slices/themeSlice';

const Home = () => {
    const dispatch = useDispatch();

    const { currency, sortBy, page, itemsPerPage, coinSearch } = useSelector(state => state.filters);
    const { darkTheme } = useSelector(state => state.theme);

    const handleSwitchTheme = () => {
        dispatch(setDarkTheme(!darkTheme));
    };

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

            <div className='ml-auto mr-3 mt-4 flex items-center'>
                <label
                    htmlFor='themeSwitch'
                    className='mr-2 cursor-pointer'>
                    {darkTheme ? 'Dark ' : 'Light '} theme
                </label>
                <ReactSwitch
                    onChange={handleSwitchTheme}
                    checked={darkTheme === true}
                    onColor={'#14ffec'}
                    offColor={'#333'}
                    onHandleColor={'#818181'}
                    offHandleColor={'#818181'}
                    height={20}
                    width={40}
                    id='themeSwitch'
                />
            </div>

            <Navigation />

            <Outlet />
        </main>
    );
};

export default Home;