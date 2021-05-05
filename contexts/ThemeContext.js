import React, { useContext, useState } from 'react';
import Colors from '../constants/Colors';

const ThemeContext = React.createContext(null);
const ThemeUpdateContext = React.createContext(null);

const themes = { 
    light: {
        title: 'light',
        primary: Colors.primaryLight,
        accent: Colors.accentLight
    },
    dark: {
        title: 'dark',
        primary: Colors.primaryDark,
        accent: Colors.accentDark
    },
    fuschia: {
        title: 'fuschia',
        primary: Colors.primaryFuschia,
        accent: Colors.accentFuschia
    }
}

export function useTheme(){
    return useContext(ThemeContext);
}

export function useThemeUpdate(){
    return useContext(ThemeUpdateContext);
}

export function ThemeProvider({ children }){
    const [myTheme, setMyTheme] = useState(themes.light);
    function switchTheme(newTheme){
        if(newTheme === 'light'){
            setMyTheme(themes.light);
        } else if(newTheme === 'dark'){
            setMyTheme(themes.dark);
        } else if(newTheme === 'fuschia'){
            setMyTheme(themes.fuschia);
        }
    }

    return (
        <ThemeContext.Provider value={myTheme}>
            <ThemeUpdateContext.Provider value={switchTheme}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
}