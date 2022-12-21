export const getThemeFromLS = () => {
    const isThemeInit = (localStorage.getItem("darkTheme"));

    if (!isThemeInit) {
        localStorage.setItem("darkTheme", JSON.stringify(true));
        return true;
    } else {
        const currentTheme = JSON.parse(localStorage.getItem("darkTheme")!);
        return currentTheme;
    }
}