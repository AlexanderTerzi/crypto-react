
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchItems = createAsyncThunk(
    'coins/fetchItems',
    async (params, thunkAPI) => {
        const { currency, coinSearch, sortBy, itemsPerPage, page } = params;

        const { data } = await axios.get
            (`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${itemsPerPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`)


        if (data.length === 0) {
            return thunkAPI.rejectWithValue('Products isn`t available')
        }
        return thunkAPI.fulfillWithValue(data);
    }
);

const initialState = {
    cryptoData: [],
    status: 'loading', //  loading || success || error
};

const coinsSlice = createSlice({
    name: 'coins',
    initialState,
    reducers: {
        setCryptoData(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state) => {
            state.status = 'loading';
            state.cryptoData = [];
        });
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            state.cryptoData = action.payload;
            state.status = 'success';
        });
        builder.addCase(fetchItems.rejected, (state) => {
            state.status = 'error';
            state.cryptoData = [];
        });
    }
});

export const selectCoins = ((state) => state.coins);

export const { setCryptoData } = coinsSlice.actions;
export default coinsSlice.reducer;