import { RootState } from './../store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { checkTheme } from "../../utils/checkTheme";
import { getThemeFromLS } from "../../utils/getThemeFromLS";

interface IThemeSliceState {
    darkTheme: boolean;
}

const initialState: IThemeSliceState = {
    darkTheme: getThemeFromLS(),
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<boolean>) {
            const newTheme = checkTheme(action.payload);
            state.darkTheme = newTheme;
        },
    }
});

export const selectTheme = ((state: RootState) => state.theme);

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;