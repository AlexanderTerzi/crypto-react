import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, setTheme } from '../redux/slices/themeSlice';
import { selectTranslations } from '../redux/slices/languageSlice';

import ReactSwitch from 'react-switch';

const Theme = () => {
    const t = useSelector(selectTranslations);
    const dispatch = useDispatch();
    const { darkTheme } = useSelector(selectTheme);

    const handleSwitchTheme = () => {
        dispatch(setTheme(!darkTheme));
    };

    return (
        <div className='flex ssm:text-[14px]'>
            <label
                title={t.chooseTheme}
                htmlFor='themeSwitch'
                className='mr-2 cursor-pointer'>
                {darkTheme ? `${t.darkTheme}` : `${t.lightTheme}`} {t.theme}
            </label>
            <ReactSwitch
                onChange={handleSwitchTheme}
                checked={darkTheme === true}
                onColor={'#14ffec'}
                offColor={'#333'}
                onHandleColor={'#818181'}
                offHandleColor={'#818181'}
                height={20}
                width={40}
                id='themeSwitch'
            />
        </div>

    );
};

export default Theme;