import { configureStore } from '@reduxjs/toolkit';

import coinDetailsSlice from './slices/coinDetailsSlice';
import coinsSlice from './slices/coinsSlice';
import filtersSlice from './slices/filtersSlice';
import languageSlice from './slices/languageSlice';
import savedCoinsSlice from './slices/savedCoinsSlice';
import themeSlice from './slices/themeSlice';
import trendDataSlice from './slices/trendDataSlice';

export const store = configureStore({
    reducer: {
        coins: coinsSlice,
        savedCoins: savedCoinsSlice,
        filters: filtersSlice,
        coinDetail: coinDetailsSlice,
        trendData: trendDataSlice,
        theme: themeSlice,
        language: languageSlice
    },
})