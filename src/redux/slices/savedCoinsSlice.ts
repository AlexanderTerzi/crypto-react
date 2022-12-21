import { Status } from './../enumStatus';
import { ICryptoData } from './../../components/Table';
import { RootState } from './../store';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { checkCoin } from "../../utils/checkCoin";
import { getCoinsFromLS } from "../../utils/getCoinsFromLS";

interface IFetchSavedCoins {
    totalCoins: string[];
    currency: string;
    sortBy: string;
}

interface ISavedCoinsSlice {
    savedCoins: string[];
    savedCoinsArr: ICryptoData | any;
    status: Status;
}

export const fetchSavedCoins = createAsyncThunk(
    'coins/fetchSavedCoins',
    async (params: IFetchSavedCoins, thunkAPI) => {
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

const initialState: ISavedCoinsSlice = {
    savedCoins: getCoinsFromLS(),
    savedCoinsArr: [],
    status: Status.LOADING, //  loading || success || error
};

const savedCoinsSlice = createSlice({
    name: 'savedCoins',
    initialState,
    reducers: {
        setSavedCoins(state, action: PayloadAction<string>) {
            const newState = checkCoin(action.payload)
            state.savedCoins = newState;
        },
        setSavedCoinsArr(state, action: PayloadAction<ICryptoData | []>) {
            state.savedCoinsArr = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSavedCoins.pending, (state) => {
            state.status = Status.LOADING;
            state.savedCoinsArr = [];
        });
        builder.addCase(fetchSavedCoins.fulfilled, (state, action: PayloadAction<ICryptoData>) => {
            state.savedCoinsArr = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchSavedCoins.rejected, (state) => {
            state.status = Status.ERROR;
            state.savedCoinsArr = [];
        });
    }
});

export const selectSavedCoins = ((state: RootState) => state.savedCoins)

export const { setSavedCoins, setSavedCoinsArr } = savedCoinsSlice.actions;
export default savedCoinsSlice.reducer;