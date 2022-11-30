import React from 'react';

import Currency from './Currency';
import Search from './Search';
import Sort from './Sort';

const Filters = () => {
    return (
        <div className='w-full h-12 border-2 border-gray-100 rounded-lg flex items-center justify-between relative'>
            <Search />
            <Currency />
            <Sort />
        </div>
    );
};

export default Filters;