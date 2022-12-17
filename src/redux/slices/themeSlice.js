import { createSlice } from "@reduxjs/toolkit";
import { checkTheme } from "../../utils/checkTheme";
import { getThemeFromLS } from "../../utils/getThemeFromLS";

const initialState = {
    darkTheme: getThemeFromLS(),
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme(state, action) {
            const newTheme = checkTheme(action.payload);
            state.darkTheme = newTheme;
        },
    }
});

export const selectTheme = ((state) => state.theme);

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;