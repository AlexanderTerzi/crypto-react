import React from 'react';
import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectTranslations } from '../redux/slices/languageSlice';
import { selectTheme } from '../redux/slices/themeSlice';

const Navigation = () => {
    const t = useSelector(selectTranslations);
    const { darkTheme } = useSelector(selectTheme);

    const navStyles = `${darkTheme ? 'border-cyan' : 'border-gray-100'} w-[40%] mt-12 flex justify-around align-middle border rounded-lg lg:w-[400px] md:mt-10 ssm:w-[90%]`;

    const navLinkStyles = ({ isActive }) => {
        return `${isActive ? 'bg-cyan text-gray-300' : `${darkTheme ? 'bg-gray-200 hover:text-cyan' : 'bg-dirty_white-200 hover:text-gray-200'} text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300 border-0 cursor-pointer rounded`} ease-in duration-200 w-full text-base text-center font-RobotoCondensed m-2.5 font-semibold ssm:text-[14px]`
    }

    return (
        <nav className={navStyles}>
            <NavLink to='/' className={navLinkStyles}>
                {t.crypto}
            </NavLink>
            <NavLink to='/trending' className={navLinkStyles}>
                {t.trending}
            </NavLink>
            <NavLink to='/saved' className={navLinkStyles}>
                {t.saved}
            </NavLink>
        </nav>
    );
};

export default Navigation;