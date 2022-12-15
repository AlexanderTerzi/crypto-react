import React from 'react';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../redux/slices/languageSlice';

const ErrorBlock = () => {
    const { darkTheme } = useSelector(state => state.theme);
    const t = useSelector(selectTranslations)

    const refreshPage = () => {
        window.location.reload();
    }

    return (
        <div className={`${darkTheme ? 'text-cyan' : 'text-gray-200'} min-h-[60vh] text-[20px] flex flex-col items-center justify-center p-2 text-center`}>
            <span className='max-w-[600px]'>
                {t.noCoinsError}
            </span>
            <button
                onClick={refreshPage}
                className={`bg-cyan w-[200px] text-gray-300 py-1 mt-6 flex items-center justify-center text-[16px] hover:bg-gray-100 ease-in duration-200`}>
                {t.reload}
            </button>
        </div>
    );
};

export default ErrorBlock;