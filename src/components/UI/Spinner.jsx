import React from 'react';
import { useSelector } from 'react-redux';

const Spinner = ({ classes }) => {
    const { darkTheme } = useSelector(state => state.theme)

    return (
        <div className={classes}>
            <div
                className={`${darkTheme ? 'border-r-gray-200' : 'border-r-dirty_white-200'} w-8 h-8 border-4 border-cyan rounded-full  animate-spin`}
                role="status" />
            <span className='mt-3 ml-2'>
                Loading...
            </span>
        </div>
    );
};

export default Spinner;