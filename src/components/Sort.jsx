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
    const { setSortBy } = useContext(CryptoContext);
    const sortRef = useRef();

    const handleSortChange = (e) => {
        e.preventDefault();

        setSortBy(sortRef.current.value);
    }

    return (
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
    );
};

export default Sort;