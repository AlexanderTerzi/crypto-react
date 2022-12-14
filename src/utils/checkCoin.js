export const checkCoin = (coinId) => {
    const currentSavedCoins = JSON.parse(localStorage.getItem("savedCoins"));

    if (currentSavedCoins.includes(coinId)) {
        const newSavedCoins = currentSavedCoins.filter(coin => coin !== coinId);
        localStorage.setItem("savedCoins", JSON.stringify(newSavedCoins));
        return newSavedCoins;
    } else {
        const newSavedCoins = [...currentSavedCoins, coinId];
        localStorage.setItem("savedCoins", JSON.stringify(newSavedCoins));
        return newSavedCoins;
    }
};