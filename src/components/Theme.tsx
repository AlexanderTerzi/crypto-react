import React from 'react';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { selectTheme, setTheme } from '../redux/slices/themeSlice';
import { selectTranslations } from '../redux/slices/languageSlice';

import ReactSwitch from 'react-switch';

const Theme: React.FC = () => {
    const t = useSelector(selectTranslations);
    const dispatch = useAppDispatch();
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