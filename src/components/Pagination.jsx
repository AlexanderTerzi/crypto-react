import React, { useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setItemsPerPage, setPage } from '../redux/slices/filtersSlice';

import arrowIcon from '../assets/img/pagination-arrow.svg';
import submitIcon from '../assets/img/submit-icon.svg';

const ItemsPerPage = () => {
    const dispatch = useDispatch();

    const inputRef = useRef(null);

    const handlePerPageSubmit = (e) => {
        e.preventDefault();

        let val = inputRef.current.value;

        if (val != 0) {
            dispatch(setItemsPerPage(val));
            inputRef.current.value = val;
        }
    };

    return (
        <form
            className='relative flex items-center font-RobotoCondensed mr-12 sm:mr-0'
            onSubmit={handlePerPageSubmit}>
            <label
                className='relative flex justify-center items-center mr-2 font-bold'
                htmlFor="perPage">
                Per Page
            </label>
            <input
                ref={inputRef}
                type="number"
                name="perPage"
                id="perPage"
                placeholder='10'
                min='1'
                max='200'
                className='w-16 rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-cyan ease-in duration-200 leading-4'
            />
            <button type='submit' className='ml-1 cursor-pointer'>
                <img
                    className='w-full h-auto'
                    src={submitIcon}
                    alt="Submit" />
            </button>
        </form>
    )
}

const Pagination = () => {
    const dispatch = useDispatch();

    const { itemsPerPage, totalPages, page } = useSelector(state => state.filters);
    const { cryptoData } = useSelector(state => state.coins);

    const totalNumber = Math.ceil(Number(totalPages) / itemsPerPage) || 10;

    const nextPage = () => {
        if (page === totalNumber) {
            return null;
        } else {
            dispatch(setPage(page + 1));
        };
    };

    const prevPage = () => {
        if (page === 1) {
            return null;
        } else {
            dispatch(setPage(page - 1));
        };
    };

    const multiNextPage = () => {
        if (page + 3 >= totalNumber) {
            dispatch(setPage(totalNumber - 1))
        } else {
            dispatch(setPage(page + 3));
        };
    };

    const multiPrevPage = () => {
        if (page - 3 <= totalNumber) {
            dispatch(setPage(page - 3))
        } else {
            dispatch(setPage(page - 2))
        };
    };

    if (cryptoData && cryptoData.length >= itemsPerPage) {
        return (
            <div className='flex items-center lg:mt-3 sm:flex-col'>
                <ItemsPerPage />
                <ul className='flex items-center justify-end text-sm sm:mt-3'>
                    <li className='flex items-center'>
                        <button
                            onClick={prevPage}
                            className='outline-0 hover:text-cyan w-8'>
                            <img
                                src={arrowIcon}
                                alt="left"
                                className='h-6 rotate-180'
                            />
                        </button>
                    </li>
                    {page + 1 === totalNumber || page === totalNumber && <li>
                        <button
                            onClick={multiPrevPage}
                            className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center ease-in duration-200 text-[18px]'>
                            ...
                        </button>
                    </li>}
                    {page - 1 !== 0 && <li>
                        {page > 1 && <button
                            onClick={prevPage}
                            className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center ease-in duration-200 text-[18px] bg-gray-200 mx-1.5'>
                            {page - 1}
                        </button>}
                    </li>}
                    <li>
                        <button
                            disabled
                            className='outline-0 rounded-full w-8 h-8 flex items-center justify-center ease-in duration-200 text-[18px] bg-cyan text-gray-300 mx-1.5'>
                            {page}
                        </button>
                    </li>
                    {page + 1 !== totalNumber && page !== totalNumber && <li>
                        <button
                            onClick={nextPage}
                            className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center ease-in duration-200 text-[18px] bg-gray-200 mx-1.5'>
                            {page + 1}
                        </button>
                    </li>}
                    {page + 1 !== totalNumber && page !== totalNumber && <li>
                        <button
                            onClick={multiNextPage}
                            className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center ease-in duration-200 text-[18px]'>
                            ...
                        </button>
                    </li>}
                    {page !== totalNumber && <li>
                        <button
                            onClick={() => dispatch(setPage(totalNumber))}
                            className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center ease-in duration-200 text-[18px] bg-gray-200 mx-1.5'>
                            {totalNumber}
                        </button>
                    </li>}
                    <li className='flex items-center'>
                        <button
                            onClick={nextPage}
                            className='outline-0 hover:text-cyan w-8'>
                            <img
                                src={arrowIcon}
                                alt="right"
                                className='h-6'
                            />
                        </button>
                    </li>
                </ul>
            </div>
        );
    };
};

export default Pagination;