export const setLanguage = (lang: string) => {
    localStorage.setItem("language", JSON.stringify(lang));
};