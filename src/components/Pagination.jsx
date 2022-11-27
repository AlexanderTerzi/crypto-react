import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { CryptoContext } from '../pages/Home';

import arrowIcon from '../assets/img/pagination-arrow.svg';


const Pagination = () => {
    const { page, setPage, totalPages } = useContext(CryptoContext);

    const totalNumber = Math.ceil(Number(totalPages) / 10) || 10;

    const nextPage = () => {
        if (page === totalNumber) {
            return null;
        } else {
            setPage(page + 1);
        };
    };

    const prevPage = () => {
        if (page === 1) {
            return null;
        } else {
            setPage(page - 1);
        };
    };

    const multiNextPage = () => {
        if (page + 3 >= totalNumber) {
            setPage(totalNumber - 1)
        } else {
            setPage(page + 3)
        };
    };

    const multiPrevPage = () => {
        if (page - 3 <= totalNumber) {
            setPage(page - 3)
        } else {
            setPage(page - 2)
        };
    };

    return (
        <div className='flex items-center'>
            <ul className='flex items-center justify-end text-sm'>
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
                        onClick={() => setPage(totalNumber)}
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

export default Pagination;