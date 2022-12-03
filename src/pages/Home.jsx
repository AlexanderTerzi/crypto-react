import React, { createContext, useEffect, useState, useLayoutEffect } from 'react';
import { Outlet } from 'react-router-dom';

import axios from 'axios';

import Logo from '../components/Logo';
import Navigation from '../components/Navigation';

export const CryptoContext = createContext({});

const Home = () => {
    const [cryptoData, setCryptoData] = useState();
    const [searchData, setSearchData] = useState();
    const [coinSearch, setCoinSearch] = useState('');
    const [currency, setCurrency] = useState('usd');
    const [sortBy, setSortBy] = useState('market_cap_desc');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [savedCoins, setSavedCoins] = useState([]);

    useEffect(() => {
        const getCryptoData = async () => {
            setCryptoData();
            try {
                const { data } = await axios.get
                    (`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${itemsPerPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`)
                setCryptoData(data);
            } catch (error) {
                console.log(error);
                alert('Server error')
            }
        }

        const getTotalNumber = async () => {
            try {
                // const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/list`);
                // setTotalPages(data.length)
                setTotalPages(2770)
            } catch (error) {
                console.log(error);
                alert('Server error')
            }
        }

        getTotalNumber();
        getCryptoData();

    }, [coinSearch, currency, sortBy, page, itemsPerPage]);

    const getSearchResult = async (query) => {
        try {
            const data = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`)
                .then(res => res.data);
            setSearchData(data.coins);
        } catch (error) {
            console.log(error);
            alert('Server error');
        }
    };

    const checkCoin = (coinId) => {
        const currentSavedCoins = JSON.parse(localStorage.getItem("savedCoins"));

        if (currentSavedCoins.includes(coinId)) {
            const newSavedCoins = currentSavedCoins.filter(coin => coin !== coinId);
            setSavedCoins(newSavedCoins);
            localStorage.setItem("savedCoins", JSON.stringify(newSavedCoins));
        } else {
            const newSavedCoins = [...currentSavedCoins, coinId];
            setSavedCoins(newSavedCoins);
            localStorage.setItem("savedCoins", JSON.stringify(newSavedCoins));
        }
    };

    useEffect(() => {
        const isCoinSaved = JSON.parse(localStorage.getItem("savedCoins")) || false;

        if (!isCoinSaved) {
            localStorage.setItem("savedCoins", JSON.stringify([]));
        } else {
            const totalSavedCoins = JSON.parse(localStorage.getItem("savedCoins"));
            setSavedCoins(totalSavedCoins);
        }

    }, [])

    const resetPage = () => {
        setPage(1);
        setCoinSearch('');
    };

    return (
        <CryptoContext.Provider value={{ cryptoData, searchData, setSearchData, getSearchResult, setCoinSearch, setCurrency, currency, sortBy, setSortBy, page, setPage, totalPages, resetPage, setItemsPerPage, itemsPerPage, checkCoin, savedCoins }}>
            <main className='w-full h-full flex flex-col content-center items-center relative text-white font-RobotoCondensed'>
                <div className='w-screen h-screen bg-gray-300 fixed -z-10'></div>
                <Logo />
                <Navigation />

                <Outlet />
            </main>
        </CryptoContext.Provider>
    );
};

export default Home;