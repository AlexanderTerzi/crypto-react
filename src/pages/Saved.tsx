import React, { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { fetchSavedCoins, selectSavedCoins, setSavedCoinsArr } from '../redux/slices/savedCoinsSlice';
import { selectTranslations } from '../redux/slices/languageSlice';
import { selectTheme } from '../redux/slices/themeSlice';
import { selectFilters } from '../redux/slices/filtersSlice';

import SaveBtn from '../components/UI/SaveBtn';
import ErrorBlock from '../components/ErrorBlock';
import { ICryptoData } from '../components/Table';

const Saved: React.FC = () => {
    const dispatch = useAppDispatch();
    const t = useSelector(selectTranslations);

    const { savedCoins, savedCoinsArr, status } = useSelector(selectSavedCoins);
    const { darkTheme } = useSelector(selectTheme);
    const { currency, sortBy } = useSelector(selectFilters)

    const getSavedData = async (totalCoins: string[]) => {
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
                                    savedCoinsArr && savedCoinsArr.map((data: ICryptoData) => {
                                        return (
                                            <tr
                                                key={data.id}
                                                className={`${darkTheme ? 'hover:bg-gray-200' : 'hover:bg-dirty_white-200'} text-center text-base border-b border-gray-100 ease-in duration-200`}>
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
                    ) : <div className={`${darkTheme ? 'text-cyan' : 'text-gray-200'} min-h-[60vh] text-[20px] flex flex-col items-center justify-center p-2 text-center`}>
                        <h1 className={`${darkTheme ? 'text-cyan' : 'text-gray-200'} text-lg flex items-center justify-center ssm:text-[20px]`}>
                            {t.noSavedCoins}
                        </h1>
                        <Link
                            to='/'
                            className='bg-cyan w-[200px] text-gray-300 py-1 mt-6 flex items-center justify-center text-[16px] hover:bg-gray-100 ease-in duration-200'>
                            {t.toCoins}
                        </Link>
                    </div>
                }
                {
                    status === 'error' && <ErrorBlock />
                }
            </div>
            <Outlet />
        </section>
    );
};

export default Saved;