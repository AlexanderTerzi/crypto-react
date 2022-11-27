import React from 'react';
import Filters from '../components/Filters';

import Table from '../components/Table';

const Crypto = () => {
    return (
        <section className='w-[80%] h-full flex-col mt-16 mb-24 relative'>
            <Filters />
            <Table />
        </section>
    );
};

export default Crypto;