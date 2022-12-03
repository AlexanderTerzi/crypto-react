import React, { useContext, useRef } from 'react';

import { CryptoContext } from '../pages/Home';

const sortTypes = [
    { value: 'market_cap_desc', name: 'market cap desc' },
    { value: 'market_cap_asc', name: 'market cap asc' },
    { value: 'volume_desc', name: 'volume desc' },
    { value: 'volume_asc', name: 'volume asc' },
    { value: 'id_desc', name: 'name desc' },
    { value: 'id_asc', name: 'name asc' },
    { value: 'gecko_desc', name: 'gecko desc' },
    { value: 'gecko_asc', name: 'gecko asc' },
];

const Sort = () => {
    const { setSortBy, resetPage } = useContext(CryptoContext);
    const sortRef = useRef();

    const handleSortChange = (e) => {
        e.preventDefault();

        setSortBy(sortRef.current.value);
    }

    return (
        <div className='flex'>
            <label className='relative flex justify-center items-center mr-7'>
                <span className='font-bold mr-2'>
                    sort by:
                </span>
                <select
                    name="sortby"
                    id="sortby"
                    className='rounded bg-gray-200 text-base pl-2 pr-10 py-1 leading-4 capitalize outline-0 focus:outline-0'
                    ref={sortRef}
                    onChange={handleSortChange}
                >
                    {
                        sortTypes && sortTypes.map((sortBy) => {
                            return (
                                <option value={sortBy.value} key={sortBy.value}>
                                    {sortBy.name}
                                </option>
                            )
                        })
                    }
                </select>
            </label>
            <button
                onClick={resetPage}
                title="reset"
                className='w-[2rem] mr-4 transition-all transition-ease hover:-rotate-[10deg]'>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    className='w-full h-full fill-white hover:fill-cyan ease-in duration-200'
                    style={{
                        msTransform: "rotate(360deg)",
                        WebkitTransform: "rotate(360deg)",
                        transform: "rotate(360deg)",
                    }}
                >
                    <path
                        d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3z"
                    />
                    <path
                        d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z"
                    />
                    <path fill="rgba(0, 0, 0, 0)" d="M0 0h24v24H0z" />
                </svg>
            </button>
        </div>
    );
};

export default Sort;