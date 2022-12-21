import React, { useRef } from 'react';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { setCurrency } from '../redux/slices/filtersSlice';
import { selectTranslations } from '../redux/slices/languageSlice';
import { selectTheme } from '../redux/slices/themeSlice';

interface ICurrencyTypes {
    value: string;
    name: string;
}

const currencyTypes: ICurrencyTypes[] = [
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

const Currency: React.FC = () => {
    const dispatch = useAppDispatch();

    const t = useSelector(selectTranslations);
    const { darkTheme } = useSelector(selectTheme);

    const currencyRef = useRef<HTMLSelectElement>(null);

    const handleCurrencySubmit = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();

        if (currencyRef.current) {
            dispatch(setCurrency(currencyRef.current?.value));
        }
    }

    return (
        <div className='flex mr-7 md:mr-2'>
            <form
                className='relative flex items-center font-RobotoCondensed mr-12 xl:mr-0 xl:ml-2 ssm:text-[14px]'>
                <label
                    className='relative flex justify-center items-center mr-2 font-bold md:mr-0'
                    htmlFor="currency">
                    {t.currency}
                </label>
                <select
                    name="currency"
                    id="currency"
                    className={`${darkTheme ? 'bg-gray-200' : 'bg-dirty_white-200'} rounded text-base pl-2 pr-10 py-1 leading-4 focus:outline-0 uppercase ssm:text-[13px]`}
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