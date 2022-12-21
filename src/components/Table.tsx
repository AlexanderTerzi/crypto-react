import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectTranslations } from '../redux/slices/languageSlice';
import { selectFilters } from '../redux/slices/filtersSlice';
import { selectCoins } from '../redux/slices/coinsSlice';
import { selectTheme } from '../redux/slices/themeSlice';

import Pagination from './Pagination';
import SaveBtn from './UI/SaveBtn';
import Spinner from './UI/Spinner';
import ErrorBlock from './ErrorBlock';
import coinGeckoLogo from '../assets/img/coingecko-logo.webp';

export interface ICryptoData {
    id: string;
    image: string;
    name: string;
    symbol: string;
    current_price: number;
    total_volume: number;
    market_cap_change_percentage_24h: number;
    price_change_percentage_1h_in_currency: number;
    price_change_percentage_24h_in_currency: number;
    price_change_percentage_7d_in_currency: number;
}

const Table: React.FC = () => {
    const t = useSelector(selectTranslations);

    const { currency } = useSelector(selectFilters);
    const { cryptoData, status } = useSelector(selectCoins);
    const { darkTheme } = useSelector(selectTheme);

    return (
        <>
            <div className='flex flex-col mt-9 border border-gray-100 rounded'>
                {
                    cryptoData && status !== 'loading' ? (
                        <table className='w-full table-auto'>
                            <thead className='capitalize text-base text-gray-100 font-medium border-b border-gray-100'>
                                <tr>
                                    <th className='py-1'>{t.assetsCoins}</th>
                                    <th className='py-1'>{t.nameCoins}</th>
                                    <th className='py-1'>{t.priceCoins}</th>
                                    <th className='py-1 ssm:hidden'>{t.totalVolumeCoins}</th>
                                    <th className='py-1 md:hidden'>{t.marketCapChangeCoins}, %</th>
                                    <th className='py-1 table-cell lg:hidden'>1H, %</th>
                                    <th className='py-1 table-cell lg:hidden'>24H, %</th>
                                    <th className='py-1 table-cell lg:hidden'>7D, %</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cryptoData.map((data: ICryptoData) => {
                                        return (
                                            <tr
                                                key={data.id}
                                                className={`${darkTheme ? 'hover:bg-gray-200' : 'hover:bg-dirty_white-200'} text-center text-base border-b border-gray-100 ease-in duration-200 last:border-0 ssm:text-sm`}>
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
                {
                    status === 'error' && <ErrorBlock />
                }
            </div>
            <div className='flex items-center justify-between mt-4 h-[2rem] lg:flex-col ssm:text-[14px]'>
                <span className='flex items-center'>
                    {t.dataProvided}&nbsp;
                    <a
                        href="https://www.coingecko.com/"
                        target='_blank'
                        rel='noreferrer'
                        className={`${darkTheme ? 'text-cyan' : 'text-gray-100'} flex`}
                    >
                        CoinGecko
                        <img
                            src={coinGeckoLogo}
                            alt="CoinGecko"
                            className='h-6 ml-1 ssm:h-5'
                        />
                    </a>
                </span>
                <Pagination />
            </div>
        </>
    );
};

export default Table;