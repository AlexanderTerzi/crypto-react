import React from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './UI/Spinner';

const TrendingItem = ({ data }) => {
    const navigate = useNavigate();

    const getCoinDetails = (id) => {
        navigate(`${id}`);
    };

    return (
        <div className='w-[40%] lg:w-[90%] bg-gray-200 mb-12 last:mb-0 rounded-lg p-4 relative cursor-pointer hover:bg-gray-100 hover:bg-opacity-40 ease-in duration-200'
            onClick={() => getCoinDetails(data.id)}>
            {data ? <>
                <h3 className='text-base flex items-center my-0.5'>
                    <span className='text-gray-100 capitalize'>
                        name:&nbsp;
                    </span>
                    <span className='text-cyan'>
                        {data.name}
                    </span>
                    <img
                        className='w-[1.5rem] h-[1.5rem] mx-1.5 rounded-full'
                        src={data.small} alt={data.name}
                    />
                </h3>
                <h3 className='text-base flex items-center my-0.5'>
                    <span className='text-gray-100 capitalize'>
                        Market cap rank:&nbsp;
                    </span>
                    <span className='text-cyan'>
                        {data.market_cap_rank}
                    </span>
                </h3>
                <h3 className='text-base flex items-center my-0.5'>
                    <span className='text-gray-100 capitalize'>
                        price (in BTC):&nbsp;
                    </span>
                    <span className='text-cyan'>
                        {
                            new Intl.NumberFormat("en-In", {
                                style: 'currency',
                                currency: `btc`,
                                maximumSignificantDigits: 5,
                            }).format(data.price_btc)
                        }
                    </span>
                </h3>
                <h3 className='text-base flex items-center my-0.5'>
                    <span className='text-gray-100 capitalize'>
                        Score:&nbsp;
                    </span>
                    <span className='text-cyan'>
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