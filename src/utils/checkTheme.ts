export const checkTheme = (bool: boolean) => {
    const newTheme = bool;
    localStorage.setItem("darkTheme", JSON.stringify(bool));
    return newTheme;
};