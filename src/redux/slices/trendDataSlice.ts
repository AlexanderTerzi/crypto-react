import { RootState } from './../store';
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Status } from '../enumStatus';
import axios from 'axios';

type coinsType = {
    item: {
        id: string;
        name: string;
        small: string;
        market_cap_rank: string;
        price_btc: number;
        score: number;
        large: string;
    }
}

type trendDataType = {
    coins: coinsType[];
    length: number;
}

interface ITrendDataSlice {
    trendData: trendDataType | any;
    status: Status;
}

export const fetchTrendData = createAsyncThunk(
    'coins/fetchTrendData',
    async (_: any, thunkAPI) => {

        const { data } = await axios.get
            (`https://api.coingecko.com/api/v3/search/trending`)

        if (data.length === 0) {
            return thunkAPI.rejectWithValue('Products isn`t available')
        }
        return thunkAPI.fulfillWithValue(data);
    }
);

const initialState: ITrendDataSlice = {
    trendData: {},
    status: Status.LOADING, //  loading || success || error
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
            state.status = Status.LOADING;
            state.trendData = {};
        });
        builder.addCase(fetchTrendData.fulfilled, (state, action: PayloadAction<trendDataType[]>) => {
            state.trendData = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchTrendData.rejected, (state) => {
            state.status = Status.ERROR;
            state.trendData = {};
        });
    }
});

export const selectTrendData = ((state: RootState) => state.trendData);

export const { setTrendData } = trendDataSlice.actions;
export default trendDataSlice.reducer;