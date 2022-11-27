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
        <div className='flex mr-7'>
            <form
                className='relative flex items-center font-RobotoCondensed mr-12'>
                <label
                    className='relative flex justify-center items-center mr-2 font-bold'
                    htmlFor="currency">
                    currency
                </label>
                {/* <input
                    ref={currencyRef}
                    type="text"
                    name="currency"
                    id="currency"
                    placeholder='usd'
                    className='w-16 rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-cyan ease-in duration-200 leading-4'
                />
                <button type='submit' className='ml-1 cursor-pointer'>
                    <img
                        className='w-full h-auto'
                        src={submitIcon}
                        alt="Submit" />
                </button> */}
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