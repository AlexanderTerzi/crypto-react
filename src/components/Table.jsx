import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Pagination from './Pagination';
import SaveBtn from './UI/SaveBtn';
import Spinner from './UI/Spinner';
import coinGeckoLogo from '../assets/img/coingecko-logo.webp';

const Table = () => {

    const { currency } = useSelector(state => state.filters);
    const { cryptoData, status } = useSelector(state => state.coins);

    return (
        <>
            <div className='flex flex-col mt-9 border border-gray-100 rounded'>
                {
                    cryptoData && status !== 'loading' ? (
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
                                    cryptoData.map((data) => {
                                        return (
                                            <tr
                                                key={data.id}
                                                className='text-center text-base border-b border-gray-100 hover:bg-gray-200 ease-in duration-200 last:border-0 ssm:text-sm'>
                                                <td className='py-4 flex items-center uppercase'>
                                                    <SaveBtn data={data} />
                                                    <Link to={`/${data.id}`} className='flex items-center'>
                                                        <img
                                                            className='w-[1.2rem] h-[1.2rem] mx-1.5 mt-[2px]'
                                                            src={data.image}
                                                            alt={data.name}
                                                        />
                                                        <span>
                                                            {data.symbol}
                                                        </span>
                                                    </Link>

                                                </td>
                                                <td className='py-4'>
                                                    <Link to={`/${data.id}`}>
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
                    )
                        : <Spinner classes={'w-full min-h-[60vh] h-full flex justify-center flex-col items-center'} />
                }
            </div>
            <div className='flex items-center justify-between mt-4 capitalize h-[2rem] lg:flex-col'>
                <span className='flex items-center'>
                    Data provided by&nbsp;
                    <a
                        href="https://www.coingecko.com/"
                        target='_blank'
                        rel='noreferrer'
                        className='text-cyan flex'
                    >
                        CoinGecko
                        <img
                            src={coinGeckoLogo}
                            alt="CoinGecko"
                            className='h-6 ml-1'
                        />
                    </a>
                </span>
                <Pagination />
            </div>
        </>
    );
};

export default Table;