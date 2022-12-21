import React from 'react';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../../redux/slices/languageSlice';
import { selectTheme } from '../../redux/slices/themeSlice';

interface ISpinnerProps {
    classes: string;
}

const Spinner: React.FC<ISpinnerProps> = ({ classes }) => {
    const t = useSelector(selectTranslations);
    const { darkTheme } = useSelector(selectTheme);

    return (
        <div className={classes}>
            <div
                className={`${darkTheme ? 'border-r-gray-200' : 'border-r-dirty_white-200'} w-8 h-8 border-4 border-cyan rounded-full  animate-spin`}
                role="status" />
            <span className='mt-3 ml-2'>
                {t.loading}
            </span>
        </div>
    );
};

export default Spinner;