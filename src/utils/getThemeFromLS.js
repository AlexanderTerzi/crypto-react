export const getThemeFromLS = () => {
    const isThemeInit = localStorage.getItem("darkTheme");

    if (!isThemeInit) {
        localStorage.setItem("darkTheme", JSON.stringify(true))
        console.log('created')
        return true;
    } else {
        const currentTheme = JSON.parse(localStorage.getItem("darkTheme"));
        console.log(currentTheme)
        return currentTheme;
    }
}