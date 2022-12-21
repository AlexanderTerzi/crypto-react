export const checkCoin = (coinId: string) => {
    const currentSavedCoins = JSON.parse(localStorage.getItem("savedCoins")!);

    if (currentSavedCoins && currentSavedCoins.includes(coinId)) {
        const newSavedCoins = currentSavedCoins.filter((coin: string) => coin !== coinId);
        localStorage.setItem("savedCoins", JSON.stringify(newSavedCoins));
        return newSavedCoins;
    } else {
        const newSavedCoins = [...currentSavedCoins, coinId];
        localStorage.setItem("savedCoins", JSON.stringify(newSavedCoins));
        return newSavedCoins;
    }
};