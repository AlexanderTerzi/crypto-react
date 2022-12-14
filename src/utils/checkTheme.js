export const checkTheme = (bool) => {
    const newTheme = bool;
    localStorage.setItem("darkTheme", JSON.stringify(bool));
    return newTheme;
};