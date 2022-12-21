import { RootState } from './../store';
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Status } from '../enumStatus';
import axios from 'axios';

type coinDataType = {
    id: string;
    name: string;
    image: {
        large: string;
    }
    links: {
        subreddit_url: string;
        twitter_screen_name: string;
        facebook_username: string;
        repos_url: {
            github: string[]
        };
        official_forum_url: string[];
        blockchain_site: string[];
        homepage: string[];
    };
    market_data: {
        circulating_supply: number;
        max_supply: number;
        high_24h: any;
        low_24h: any;
        current_price: any;
        total_volume: any;
        fully_diluted_valuation: any;
        market_cap: any;
        price_change_percentage_24h: any;
    }
    symbol: string;
    length: number;
    coingecko_score: number | string;
    coingecko_rank: number | string;
    market_cap_rank: number | string;
    sentiment_votes_up_percentage: number | string;
    sentiment_votes_down_percentage: number | string;
}

interface ICoinDetailsSlice {
    coinData: coinDataType | string;
    status: Status;
}

export const fetchCoinData = createAsyncThunk(
    'coins/fetchCoinData',
    async (coinId: string | number, thunkAPI) => {

        const { data } = await axios.get
            (`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`)

        if (data.length === 0) {
            return thunkAPI.rejectWithValue('Products isn`t available')
        }
        return thunkAPI.fulfillWithValue(data);
    }
);

const initialState: ICoinDetailsSlice = {
    coinData: '',
    status: Status.LOADING, //  loading || success || error
};

const coinDetailsSlice = createSlice({
    name: 'coinDetails',
    initialState,
    reducers: {
        setCoinData(state, action: PayloadAction<coinDataType>) {
            state.coinData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCoinData.pending, (state) => {
            state.status = Status.LOADING;
            state.coinData = '';
        });
        builder.addCase(fetchCoinData.fulfilled, (state, action: PayloadAction<coinDataType>) => {
            state.coinData = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchCoinData.rejected, (state) => {
            state.status = Status.ERROR;
            state.coinData = '';
        });
    }
});

export const selectCoinDetails = ((state: RootState) => state.coinDetail);

export const { setCoinData } = coinDetailsSlice.actions;
export default coinDetailsSlice.reducer;