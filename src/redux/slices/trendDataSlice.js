import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchTrendData = createAsyncThunk(
    'coins/fetchTrendData',
    async (_, thunkAPI) => {

        const { data } = await axios.get
            (`https://api.coingecko.com/api/v3/search/trending`)

        if (data.length === 0) {
            return thunkAPI.rejectWithValue('Products isn`t available')
        }
        return thunkAPI.fulfillWithValue(data);
    }
);

const initialState = {
    trendData: '',
    status: 'loading', //  loading || success || error
};

const trendDataSlice = createSlice({
    name: 'coinDetails',
    initialState,
    reducers: {
        setTrendData(state, action) {
            state.trendData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTrendData.pending, (state) => {
            state.status = 'loading';
            state.trendData = '';
        });
        builder.addCase(fetchTrendData.fulfilled, (state, action) => {
            state.trendData = action.payload;
            state.status = 'success';
        });
        builder.addCase(fetchTrendData.rejected, (state) => {
            state.status = 'error';
            state.trendData = '';
        });
    }
});

export const selectTrendData = ((state) => state.trendData);

export const { setTrendData } = trendDataSlice.actions;
export default trendDataSlice.reducer;