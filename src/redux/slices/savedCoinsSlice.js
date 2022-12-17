import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { checkCoin } from "../../utils/checkCoin";
import { getCoinsFromLS } from "../../utils/getCoinsFromLS";


export const fetchSavedCoins = createAsyncThunk(
    'coins/fetchSavedCoins',
    async (params, thunkAPI) => {
        const { totalCoins, currency, sortBy } = params;

        const { data } = await axios.get
            (`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(
                ","
            )}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`);


        if (data.length === 0) {
            return thunkAPI.rejectWithValue('Products isn`t available')
        }
        return thunkAPI.fulfillWithValue(data);
    }
);

const initialState = {
    savedCoins: getCoinsFromLS(),
    savedCoinsArr: [],
    status: 'loading', //  loading || success || error
};

const savedCoinsSlice = createSlice({
    name: 'savedCoins',
    initialState,
    reducers: {
        setSavedCoins(state, action) {
            const newState = checkCoin(action.payload)
            state.savedCoins = newState;
        },
        setSavedCoinsArr(state, action) {
            state.savedCoinsArr = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSavedCoins.pending, (state) => {
            state.status = 'loading';
            state.savedCoinsArr = [];
        });
        builder.addCase(fetchSavedCoins.fulfilled, (state, action) => {
            state.savedCoinsArr = action.payload;
            state.status = 'success';
        });
        builder.addCase(fetchSavedCoins.rejected, (state) => {
            state.status = 'error';
            state.savedCoinsArr = [];
        });
    }
});

export const selectSavedCoins = ((state) => state.savedCoins)

export const { setSavedCoins, setSavedCoinsArr } = savedCoinsSlice.actions;
export default savedCoinsSlice.reducer;