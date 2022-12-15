import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectTranslations } from '../redux/slices/languageSlice';

import Spinner from './UI/Spinner';

const TrendingItem = ({ data }) => {
    const navigate = useNavigate();
    const t = useSelector(selectTranslations);

    const { darkTheme } = useSelector(state => state.theme);

    const getCoinDetails = (id) => {
        navigate(`${id}`);
    };

    return (
        <div className={`${darkTheme ? 'bg-gray-200' : 'bg-dirty_white-200'} w-[40%] lg:w-[90%] mb-12 rounded-lg p-4 relative cursor-pointer hover:bg-gray-100 hover:bg-opacity-40 ease-in duration-200 sm:mb-6`}
            onClick={() => getCoinDetails(data.id)}>
            {data ? <>
                <h3 className='text-base flex items-center my-0.5 ssm:text-[15px]'>
                    <span className='text-gray-100 capitalize'>
                        {t.nameCoins}:&nbsp;
                    </span>
                    <span className={`${darkTheme ? 'text-cyan' : 'text-gray-300'}`}>
                        {data.name}
                    </span>
                    <img
                        className='w-[1.5rem] h-[1.5rem] mx-1.5 rounded-full'
                        src={data.small} alt={data.name}
                    />
                </h3>
                <h3 className='text-base flex items-center my-0.5 ssm:text-[15px]'>
                    <span className='text-gray-100 capitalize'>
                        {t.marketCapRankCoins}:&nbsp;
                    </span>
                    <span className={`${darkTheme ? 'text-cyan' : 'text-gray-300'}`}>
                        {data.market_cap_rank}
                    </span>
                </h3>
                <h3 className='text-base flex items-center my-0.5 ssm:text-[15px]'>
                    <span className='text-gray-100 capitalize'>
                        {t.priceCoins} (in BTC):&nbsp;
                    </span>
                    <span className={`${darkTheme ? 'text-cyan' : 'text-gray-300'}`}>
                        {
                            new Intl.NumberFormat("en-In", {
                                style: 'currency',
                                currency: `btc`,
                                maximumSignificantDigits: 5,
                            }).format(data.price_btc)
                        }
                    </span>
                </h3>
                <h3 className='text-base flex items-center my-0.5 ssm:text-[15px]'>
                    <span className='text-gray-100 capitalize'>
                        {t.scoreCoins}:&nbsp;
                    </span>
                    <span className={`${darkTheme ? 'text-cyan' : 'text-gray-300'}`}>
                        {data.score}
                    </span>
                </h3>
                <img
                    className='w-auto h-[150px] lg:h-[100px] ssm:hidden rounded-full absolute top-2/4 -right-12 lg:right-2 -translate-y-2/4'
                    src={data.large} alt={data.name}
                />
            </>
                : <Spinner classes={'w-full h-full flex justify-center flex-col items-center'} />}
        </div>
    );
};

export default TrendingItem;