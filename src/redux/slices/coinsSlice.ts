import { RootState } from './../store';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from '../enumStatus';
import axios from 'axios';

type cryptoDataType = {
    id: string;
    image: string;
    name: string;
    symbol: string;
    current_price: number;
    price_change_percentage_1h_in_currency: number;
    price_change_percentage_7d_in_currency: number;
    price_change_percentage_24h_in_currency: number;
    market_cap_change_percentage_24h: number;
    total_volume: number;
};

interface IFetchItems {
    currency: string;
    coinSearch: string;
    sortBy: string;
    itemsPerPage: string | number;
    page: string | number;
}

interface ICoinsSlice {
    cryptoData: cryptoDataType[];
    status: Status;
}

export const fetchItems = createAsyncThunk(
    'coins/fetchItems',
    async (params: IFetchItems, thunkAPI) => {
        const { currency, coinSearch, sortBy, itemsPerPage, page } = params;

        const { data } = await axios.get
            (`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${itemsPerPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`)


        if (data.length === 0) {
            return thunkAPI.rejectWithValue('Products isn`t available')
        }
        return thunkAPI.fulfillWithValue(data);
    }
);

const initialState: ICoinsSlice = {
    cryptoData: [],
    status: Status.LOADING, //  loading || success || error
};

const coinsSlice = createSlice({
    name: 'coins',
    initialState,
    reducers: {
        setCryptoData(state, action: PayloadAction<cryptoDataType[]>) {
            state.cryptoData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state) => {
            state.status = Status.LOADING;
            state.cryptoData = [];
        });
        builder.addCase(fetchItems.fulfilled, (state, action: PayloadAction<cryptoDataType[]>) => {
            state.cryptoData = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchItems.rejected, (state) => {
            state.status = Status.ERROR;
            state.cryptoData = [];
        });
    }
});

export const selectCoins = ((state: RootState) => state.coins);

export const { setCryptoData } = coinsSlice.actions;
export default coinsSlice.reducer;