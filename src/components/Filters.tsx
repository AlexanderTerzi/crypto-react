import React from 'react';

import Currency from './Currency';
import Search from './Search';
import Sort from './Sort';

const Filters: React.FC = () => {
    return (
        <div className='w-full py-1.5 border-2 border-gray-100 rounded-lg flex items-center justify-between relative lg:block'>
            <Search />
            <div className='flex lg:mt-2 justify-center items-center sm:flex-col '>
                <Currency />
                <Sort />
            </div>

        </div>
    );
};

export default Filters;