import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import 'react-native-gesture-handler';

// Necessary for translator to work. Do not delete!
import i18 from './languages/i18n';

import { ThemeProvider } from './contexts/ThemeContext';
import { RTLProvider } from './contexts/RTLContext';
import AppNavigator from './navigation/AppNavigator';

import AppLoading from 'expo-app-loading';

import * as Font from 'expo-font';
import { prodURI, devURI } from './keys'
import calculatorReducer from './store/reducers/calculation';

const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'production' ? prodURI : devURI,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          HomeFinancing: {
            merge(existing = [], incoming) {
              return { ...existing, ...incoming };
            }
          }
        }
      }
    }
  })
});

const rootReducer = combineReducers({
  calculation: calculatorReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'boutros': require('./assets/fonts/BoutrosMBCDinkum-Medium.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }

  return (
    <>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ThemeProvider>
            <RTLProvider>
              <AppNavigator />
            </RTLProvider>
          </ThemeProvider>
        </Provider>
      </ApolloProvider>
    </>
  );
}