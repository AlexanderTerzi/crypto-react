import { Status } from './../enumStatus';

import { RootState } from './../store';
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

export type searchDataType = {
    id: string;
    thumb: string;
    name: string;
}

interface IFilterSliceState {
    currency: string;
    sortBy: string;
    page: number;
    itemsPerPage: number | string;
    totalPages: number;
    coinSearch: string;
    searchData: any;
    status: Status;
}

export const fetchSearchResult = createAsyncThunk(
    'coins/fetchSearchResult',
    async (query: string, thunkAPI) => {

        const { data } = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`);

        if (data.length === 0) {
            return thunkAPI.rejectWithValue('Products isn`t available')
        }
        return thunkAPI.fulfillWithValue(data.coins);
    }
)

const initialState: IFilterSliceState = {
    currency: 'usd',
    sortBy: 'market_cap_desc',
    page: 1,
    itemsPerPage: 10,
    totalPages: 2770,
    coinSearch: '',
    searchData: '',
    status: Status.LOADING, //  loading || success || error
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCurrency(state, action: PayloadAction<string>) {
            state.currency = action.payload;
        },
        setSortBy(state, action: PayloadAction<string>) {
            state.sortBy = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setItemsPerPage(state, action: PayloadAction<number | string>) {
            state.itemsPerPage = action.payload;
        },
        setTotalPages(state, action: PayloadAction<number>) {
            state.totalPages = action.payload;
        },
        setCoinSearch(state, action: PayloadAction<string>) {
            state.coinSearch = action.payload;
        },
        setSearchData(state, action: PayloadAction<searchDataType | string>) {
            state.searchData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSearchResult.pending, (state) => {
            state.status = Status.LOADING;
            state.searchData = '';
        });
        builder.addCase(fetchSearchResult.fulfilled, (state, action: PayloadAction<searchDataType | string>) => {
            state.searchData = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchSearchResult.rejected, (state) => {
            state.status = Status.ERROR;
            state.searchData = '';
        });
    }
});

export const selectFilters = ((state: RootState) => state.filters);

export const { setCurrency, setSortBy, setPage, setItemsPerPage, setTotalPages, setCoinSearch, setSearchData } = filtersSlice.actions;
export default filtersSlice.reducer;