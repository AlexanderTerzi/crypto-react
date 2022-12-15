import React, { useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setItemsPerPage, setPage } from '../redux/slices/filtersSlice';
import { selectTranslations } from '../redux/slices/languageSlice';


const ItemsPerPage = () => {
    const dispatch = useDispatch();
    const t = useSelector(selectTranslations);

    const { darkTheme } = useSelector(state => state.theme);

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
                className='relative flex justify-center items-center mr-2 font-bold ssm:text-[14px]'
                htmlFor="perPage">
                {t.perPage}
            </label>
            <input
                ref={inputRef}
                type="number"
                name="perPage"
                id="perPage"
                placeholder='10'
                min='1'
                max='200'
                className={`${darkTheme ? 'bg-gray-200' : 'bg-dirty_white-100'} w-16 rounded  placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-cyan ease-in duration-200 leading-4`}
            />
            <button type='submit' className='ml-1 cursor-pointer'>
                <svg
                    width={24}
                    height={24}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10.857 15.429 14.286 12l-3.429-3.429M14.286 12H4"
                        stroke={`${darkTheme ? 'cyan' : '#222'}`}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M5.143 9.714V6.277A2.286 2.286 0 0 1 7.419 3.99l9.088-.037a2.286 2.286 0 0 1 2.295 2.278l.046 11.462a2.285 2.285 0 0 1-2.277 2.295H7.43a2.286 2.286 0 0 1-2.286-2.286v-3.417"
                        stroke={`${darkTheme ? 'cyan' : '#222'}`}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </form>
    )
}

const Pagination = () => {
    const dispatch = useDispatch();

    const { itemsPerPage, totalPages, page } = useSelector(state => state.filters);
    const { cryptoData } = useSelector(state => state.coins);
    const { darkTheme } = useSelector(state => state.theme);

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
                            <svg
                                width={32}
                                height={32}
                                className='h-[32px] w-[32px] rotate-180 mt-0.5'
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16.016 1.003c-8.285 0-15 6.715-15 15 0 8.284 6.715 15 15 15 8.284 0 15-6.716 15-15 0-8.285-6.716-15-15-15Zm9.192 24.192A12.953 12.953 0 1 1 6.917 6.848a12.953 12.953 0 0 1 18.291 18.347Z"
                                    fill={`${darkTheme ? 'cyan' : '#818181'}`}
                                />
                                <path
                                    d="m14.977 10.312 4.691 4.69H8.008v2h11.66l-4.69 4.691 1.414 1.415 7.105-7.105-7.105-7.106-1.415 1.415Z"
                                    fill={`${darkTheme ? 'cyan' : '#818181'}`}
                                />
                            </svg>
                        </button>
                    </li>
                    {page + 1 === totalNumber || page === totalNumber && <li>
                        <button
                            onClick={multiPrevPage}
                            className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center ease-in duration-200 text-[16px] ssm:text-[15px]'>
                            ...
                        </button>
                    </li>}
                    {page - 1 !== 0 && <li>
                        {page > 1 && <button
                            onClick={prevPage}
                            className={`${darkTheme ? 'bg-gray-200 hover:text-cyan' : 'bg-dirty_white-200 hover:text-gray-300'} outline-0 rounded-full w-8 h-8 flex items-center justify-center ease-in duration-200 text-[16px] mx-1.5 ssm:text-[15px]`}>
                            {page - 1}
                        </button>}
                    </li>}
                    <li>
                        <button
                            disabled
                            className='outline-0 rounded-full w-8 h-8 flex items-center justify-center ease-in duration-200 text-[16px] bg-cyan text-gray-300 mx-1.5 ssm:text-[15px]'>
                            {page}
                        </button>
                    </li>
                    {page + 1 !== totalNumber && page !== totalNumber && <li>
                        <button
                            onClick={nextPage}
                            className={`${darkTheme ? 'bg-gray-200 hover:text-cyan' : 'bg-dirty_white-200 hover:text-gray-300'} outline-0 rounded-full w-8 h-8 flex items-center justify-center ease-in duration-200 text-[16px] mx-1.5 ssm:text-[15px]`}>
                            {page + 1}
                        </button>
                    </li>}
                    {page + 1 !== totalNumber && page !== totalNumber && <li>
                        <button
                            onClick={multiNextPage}
                            className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center ease-in duration-200 text-[16px] ssm:text-[15px]'>
                            ...
                        </button>
                    </li>}
                    {page !== totalNumber && <li>
                        <button
                            onClick={() => dispatch(setPage(totalNumber))}
                            className={`${darkTheme ? 'bg-gray-200 hover:text-cyan' : 'bg-dirty_white-200 hover:text-gray-300'} outline-0 rounded-full w-8 h-8 flex items-center justify-center ease-in duration-200 text-[16px] mx-1.5 ssm:text-[15px]`}>
                            {totalNumber}
                        </button>
                    </li>}
                    <li className='flex items-center'>
                        <button
                            onClick={nextPage}
                            className='outline-0 hover:text-cyan w-8'>
                            <svg
                                width={32}
                                height={32}
                                className='h-[32px] w-[32px] mt-0.5'
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16.016 1.003c-8.285 0-15 6.715-15 15 0 8.284 6.715 15 15 15 8.284 0 15-6.716 15-15 0-8.285-6.716-15-15-15Zm9.192 24.192A12.953 12.953 0 1 1 6.917 6.848a12.953 12.953 0 0 1 18.291 18.347Z"
                                    fill={`${darkTheme ? 'cyan' : '#818181'}`}
                                />
                                <path
                                    d="m14.977 10.312 4.691 4.69H8.008v2h11.66l-4.69 4.691 1.414 1.415 7.105-7.105-7.105-7.106-1.415 1.415Z"
                                    fill={`${darkTheme ? 'cyan' : '#818181'}`}
                                />
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>
        );
    };
};

export default Pagination;