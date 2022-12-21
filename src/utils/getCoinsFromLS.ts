export const getCoinsFromLS = () => {
    const isCoinSaved = JSON.parse(localStorage.getItem("savedCoins")!);

    if (!isCoinSaved) {
        localStorage.setItem("savedCoins", JSON.stringify([]))
        return [];
    } else {
        const totalSavedCoins = JSON.parse(localStorage.getItem("savedCoins")!);
        return totalSavedCoins;
    }
}