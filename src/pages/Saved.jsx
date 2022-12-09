import React, { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';

import SaveBtn from '../components/UI/SaveBtn';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSavedCoins, setSavedCoinsArr } from '../redux/slices/savedCoinsSlice';

const Saved = () => {
    const { savedCoins, savedCoinsArr } = useSelector(state => state.savedCoins);
    const dispatch = useDispatch();

    const { currency, sortBy } = useSelector(state => state.filters)

    const getSavedData = async (totalCoins) => {
        totalCoins = savedCoins;
        if (totalCoins.length > 0) {
            dispatch(fetchSavedCoins({ totalCoins, currency, sortBy }))
        }
    };

    useEffect(() => {
        if (savedCoins && savedCoins.length > 0) {
            getSavedData(savedCoins);
        } else {
            dispatch(setSavedCoinsArr([]));
        }
    }, [savedCoins]);

    return (
        <section className='w-[80%] h-full flex-col mt-16 mb-24 relative md:mt-8'>
            <div className='w-full min-h-[60vh] pb-8 border border-gray-100 rounded'>
                {
                    savedCoins.length > 0 ? (
                        <table className='w-full table-auto'>
                            <thead className='capitalize text-base text-gray-100 font-medium border-b border-gray-100'>
                                <tr>
                                    <th className='py-1'>assets</th>
                                    <th className='py-1'>name</th>
                                    <th className='py-1'>price</th>
                                    <th className='py-1 ssm:hidden'>total volume</th>
                                    <th className='py-1 md:hidden'>market cap change, %</th>
                                    <th className='py-1 table-cell lg:hidden'>1H, %</th>
                                    <th className='py-1 table-cell lg:hidden'>24H, %</th>
                                    <th className='py-1 table-cell lg:hidden'>7D, %</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    savedCoinsArr.map((data) => {
                                        return (
                                            <tr
                                                key={data.id}
                                                className='text-center text-base border-b border-gray-100 hover:bg-gray-200 ease-in duration-200'>
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
                                                <td className='py-4 ssm:hidden'>{data.total_volume}</td>
                                                <td className='py-4 md:hidden'>{data.market_cap_change_percentage_24h}</td>
                                                <td
                                                    className={`${data.price_change_percentage_1h_in_currency > 0 ? 'text-green py-4' : 'text-red py-4'} table-cell lg:hidden`}>
                                                    {Number(data.price_change_percentage_1h_in_currency).toFixed(2)}
                                                </td>
                                                <td
                                                    className={`${data.price_change_percentage_24h_in_currency > 0 ? 'text-green py-4' : 'text-red py-4'} table-cell lg:hidden`}>
                                                    {Number(data.price_change_percentage_24h_in_currency).toFixed(2)}
                                                </td>
                                                <td
                                                    className={`${data.price_change_percentage_7d_in_currency > 0 ? 'text-green py-4' : 'text-red py-4'} table-cell lg:hidden`}>
                                                    {Number(data.price_change_percentage_7d_in_currency).toFixed(2)}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    ) : <h1 className='min-h-[60vh] text-lg text-cyan flex items-center justify-center'>
                        There is no saved coins
                    </h1>
                }
            </div>
            <Outlet />
        </section>
    );
};

export default Saved;