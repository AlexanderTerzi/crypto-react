import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchSearchResult = createAsyncThunk(
    'coins/fetchSearchResult',
    async (query, thunkAPI) => {

        const { data } = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`);

        if (data.length === 0) {
            return thunkAPI.rejectWithValue('Products isn`t available')
        }
        return thunkAPI.fulfillWithValue(data.coins);
    }
)

const initialState = {
    currency: 'usd',
    sortBy: 'market_cap_desc',
    page: 1,
    itemsPerPage: 10,
    totalPages: 2770,
    coinSearch: '',
    searchData: '',
    status: 'loading', //  loading || success || error
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCurrency(state, action) {
            state.currency = action.payload;
        },
        setSortBy(state, action) {
            state.sortBy = action.payload;
        },
        setPage(state, action) {
            state.page = action.payload;
        },
        setItemsPerPage(state, action) {
            state.itemsPerPage = action.payload;
        },
        setTotalPages(state, action) {
            state.totalPages = action.payload;
        },
        setCoinSearch(state, action) {
            state.coinSearch = action.payload;
        },
        setSearchData(state, action) {
            state.searchData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSearchResult.pending, (state) => {
            state.status = 'loading';
            state.searchData = '';
        });
        builder.addCase(fetchSearchResult.fulfilled, (state, action) => {
            state.searchData = action.payload;
            state.status = 'success';
        });
        builder.addCase(fetchSearchResult.rejected, (state) => {
            state.status = 'error';
            state.searchData = '';
        });
    }
});

export const { setCurrency, setSortBy, setPage, setItemsPerPage, setTotalPages, setCoinSearch, setSearchData } = filtersSlice.actions;
export default filtersSlice.reducer;