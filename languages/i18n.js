import i18next from 'i18next';
import en from './en.json';
import ar from './ar.json';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const func = async () => {
    let lang = 'ar';
    try {
        const value = await AsyncStorage.getItem('@lang');
        if (value !== null) {
            lang = value;
        }
    } catch (e) {
        console.log(e);
    }

    return i18next.use(initReactI18next).init({
        lng: lang,
        resources: {
            en,
            ar
        },
        react: {
            useSuspense: false,
        }
    })
}

export default func();