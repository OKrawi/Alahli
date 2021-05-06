import React, { useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RTLContext = React.createContext(null);

export function useRTL() {
    return useContext(RTLContext);
}

export function RTLProvider({ children }) {
    const [rtl, setRTL] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem('@rtl').then(value => {
            if (value !== null) {
                setRTL(JSON.parse(value));
            }
        }).catch(e => console.log(e))
    });

    return (
        <RTLContext.Provider value={rtl}>
                {children}
        </RTLContext.Provider>
    )
}