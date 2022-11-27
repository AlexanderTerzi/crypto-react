import { createContext, useState } from "react";

export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
    const [test, setTest] = useState('text');

    return (
        <CryptoContext.Provider value={{ test }}>
            {children}
        </CryptoContext.Provider>
    )
}