import { createSlice } from "@reduxjs/toolkit";

import { enTranslation } from "../../translation/locales/en/translation";
import { uaTranslation } from "../../translation/locales/ua/translation";
import { getLangFromLS } from "../../utils/getLangFromLS";
import { setLanguage } from "../../utils/setLanguage";

const initialState = {
    lang: getLangFromLS(),
    supportedLangs: {
        ua: "Українська",
        en: "English",
    },
    translations: {
        ua: uaTranslation,
        en: enTranslation,
    },
};

export const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        setLang(state, action) {
            state.lang = action.payload;
            setLanguage(action.payload);
        },
    },
});

export const selectTranslations = (state) => state.language.translations[state.language.lang];
export const selectLanguage = ((state) => state.language);

export const { setLang } = languageSlice.actions;
export default languageSlice.reducer;