import React from 'react';

const Spinner = () => {
    return (
        <div className='w-full h-full flex justify-center flex-col items-center'>
            <div
                className='w-8 h-8 border-4 border-cyan rounded-full border-r-gray-200 animate-spin'
                role="status" />
            <span className='mt-3 ml-2'>
                Loading...
            </span>
        </div>
    );
};

export default Spinner;