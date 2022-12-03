import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';

import { CryptoContext } from './Home';

import SaveBtn from '../components/UI/SaveBtn';

const Saved = () => {
    const [savedData, setSavedData] = useState();
    const { savedCoins, currency, sortBy } = useContext(CryptoContext);

    const getSavedData = async (totalCoins) => {
        totalCoins = savedCoins;
        if (totalCoins.length > 0) {
            try {
                const { data } = await axios.get
                    (`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(
                        ","
                    )}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`);
                setSavedData(data);
            } catch (error) {
                console.log(error);
                alert('Server error')
            }
        }
    }

    useEffect(() => {
        if (savedCoins && savedCoins.length > 0) {
            getSavedData(savedCoins);
        } else {
            setSavedData();
        }
    }, [savedCoins]);

    return (
        <section className='w-[80%] h-full flex-col mt-16 mb-24 relative'>
            <div className='w-full min-h-[60vh] py-8 border border-gray-100 rounded'>
                {
                    savedData ? (
                        <table className='w-full table-auto'>
                            <thead className='capitalize text-base text-gray-100 font-medium border-b border-gray-100'>
                                <tr>
                                    <th className='py-1'>assets</th>
                                    <th className='py-1'>name</th>
                                    <th className='py-1'>price</th>
                                    <th className='py-1'>total volume</th>
                                    <th className='py-1'>market cap change, %</th>
                                    <th className='py-1'>1H, %</th>
                                    <th className='py-1'>24H, %</th>
                                    <th className='py-1'>7D, %</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    savedData.map((data) => {
                                        return (
                                            <tr
                                                key={data.id}
                                                className='text-center text-base border-b border-gray-100 hover:bg-gray-200 ease-in duration-200 last:border-0'>
                                                <td className='py-4 flex items-center uppercase'>
                                                    <SaveBtn data={data} />
                                                    <Link to={`${data.id}`} className='flex items-center'>
                                                        <img
                                                            className='w-[1.2rem] h-[1.2rem] mx-1.5 mt-[2px]'
                                                            src={data.image}
                                                            alt={data.name}
                                                        />
                                                        <span className='mt-[4px]'>
                                                            {data.symbol}
                                                        </span>
                                                    </Link>

                                                </td>
                                                <td className='py-4'>
                                                    <Link to={`${data.id}`}>
                                                        {data.name}
                                                    </Link>
                                                </td>
                                                <td className='py-4'>
                                                    {
                                                        new Intl.NumberFormat("en-In", {
                                                            style: 'currency',
                                                            currency: currency
                                                        }).format(data.current_price)
                                                    }
                                                </td>
                                                <td className='py-4'>{data.total_volume}</td>
                                                <td className='py-4'>{data.market_cap_change_percentage_24h}</td>
                                                <td className={data.price_change_percentage_1h_in_currency > 0 ? 'text-green py-4' : 'text-red py-4'}>
                                                    {Number(data.price_change_percentage_1h_in_currency).toFixed(2)}
                                                </td>
                                                <td className={data.price_change_percentage_24h_in_currency > 0 ? 'text-green py-4' : 'text-red py-4'}>
                                                    {Number(data.price_change_percentage_24h_in_currency).toFixed(2)}
                                                </td>
                                                <td className={data.price_change_percentage_7d_in_currency > 0 ? 'text-green py-4' : 'text-red py-4'}>
                                                    {Number(data.price_change_percentage_7d_in_currency).toFixed(2)}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    )
                        : <h1 className='min-h-[60vh] text-lg text-cyan flex items-center justify-center'>
                            There is no saved coins
                        </h1>
                }
            </div>
            <Outlet />
        </section>
    );
};

export default Saved;