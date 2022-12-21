export const getLangFromLS = () => {
    const isLangInit = localStorage.getItem("language");

    if (!isLangInit) {
        const currentLang = 'ua';

        localStorage.setItem("language", JSON.stringify(currentLang));
        return currentLang;
    } else {
        const currentLang = JSON.parse(localStorage.getItem("language")!);
        return currentLang;
    }
};