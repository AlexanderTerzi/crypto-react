import React from 'react';
import { Outlet } from 'react-router-dom';

import Filters from '../components/Filters';
import Table from '../components/Table';

const Crypto = () => {
    return (
        <section className='w-[80%] h-full flex-col mt-16 mb-24 relative'>
            <Filters />
            <Table />

            <Outlet />
        </section>
    );
};

export default Crypto;