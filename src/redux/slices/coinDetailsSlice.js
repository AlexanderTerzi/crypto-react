import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchCoinData = createAsyncThunk(
    'coins/fetchCoinData',
    async (coinId, thunkAPI) => {

        const { data } = await axios.get
            (`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`)

        if (data.length === 0) {
            return thunkAPI.rejectWithValue('Products isn`t available')
        }
        return thunkAPI.fulfillWithValue(data);
    }
);

const initialState = {
    coinData: '',
    status: 'loading', //  loading || success || error
};

const filtersSlice = createSlice({
    name: 'coinDetails',
    initialState,
    reducers: {
        setCoinData(state, action) {
            state.coinData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCoinData.pending, (state) => {
            state.status = 'loading';
            state.coinData = '';
        });
        builder.addCase(fetchCoinData.fulfilled, (state, action) => {
            state.coinData = action.payload;
            state.status = 'success';
        });
        builder.addCase(fetchCoinData.rejected, (state) => {
            state.status = 'error';
            state.coinData = '';
        });
    }
});

export const { setCoinData } = filtersSlice.actions;
export default filtersSlice.reducer;