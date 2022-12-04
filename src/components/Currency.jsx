import React, { useContext, useRef } from 'react';

import { CryptoContext } from '../pages/Home';

const currencyTypes = [
    { value: 'usd', name: 'usd' },
    { value: 'uah', name: 'uah' },
    { value: 'eur', name: 'euro' },
    { value: 'GBP', name: 'GBP' },
    { value: 'JPY', name: 'JPY' },
    { value: 'cad', name: 'cad' },
    { value: 'cny', name: 'cny' },
    { value: 'pln', name: 'pln' },
    { value: 'try', name: 'try' },
];

const Currency = () => {

    const { setCurrency } = useContext(CryptoContext);
    const currencyRef = useRef(null);

    const handleCurrencySubmit = (e) => {
        e.preventDefault();

        setCurrency(currencyRef.current.value);
    }

    return (
        <div className='flex mr-7 md:mr-0'>
            <form
                className='relative flex items-center font-RobotoCondensed mr-12 xl:mr-0 xl:ml-2'>
                <label
                    className='relative flex justify-center items-center mr-2 font-bold md:mr-0'
                    htmlFor="currency">
                    currency
                </label>
                <select
                    name="currency"
                    id="currency"
                    className='rounded bg-gray-200 text-base pl-2 pr-10 py-1 leading-4 focus:outline-0 uppercase'
                    onChange={handleCurrencySubmit}
                    ref={currencyRef}>
                    {
                        currencyTypes && currencyTypes.map((sortBy) => {
                            return (
                                <option
                                    className='uppercase'
                                    value={sortBy.value}
                                    key={sortBy.value}>
                                    {sortBy.name}
                                </option>
                            )
                        })
                    }
                </select>
            </form>
        </div>
    );
};

export default Currency;