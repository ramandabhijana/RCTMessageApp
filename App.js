/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import commonReducer from './src/reducers/commonReducers';
import * as RNLocalize from 'react-native-localize'
import i18n from 'i18n-js'
import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk'
import { NavigationContainer } from "@react-navigation/native";
import translate from './src/locales/translate'
import Colors from './src/constants/Colors';
import { AuthStack } from './src/navigations/AuthNavigator';
import { getAccessToken } from './src/services/AuthService';
import { RootStack } from './src/views/RootPageScreen';

const rootReducer = combineReducers({
  commonReducer: commonReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const theme = {
  colors: {
    primary: Colors.primary,
    colorPrimary: Colors.primary,
    primaryColor: Colors.primary
  }
}

const translationGetters = {
  en: () => require('./src/locales/en.json'),
  jp: () => require('./src/locales/jp.json')
}


const setI18nConfig = () => {
  const fallback = { languageTag: 'en' }
  const { languageTag } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback
  translate.cache.clear()
  i18n.translations = { [languageTag]: translationGetters[languageTag]() }
  i18n.locale = languageTag
}

export const AuthContext = React.createContext();

const App = () => {

  setI18nConfig()

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case 'LOADING_COMPLETE':
          return {
            ...prevState,
            isLoading: false
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await getAccessToken()
      } catch (e) {
        // Restoring token failed
      }
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContextValue = React.useMemo(
    () => ({
      signIn: async token => {
        try {
          dispatch({ type: 'SIGN_IN', token: token });
        } catch (err) {
          console.log(err)
        }
      },
      signOut: async data => {
        dispatch({ type: 'SIGN_OUT' });
      },
      doneLoading: async data => {
        dispatch({ type: 'LOADING_COMPLETE' })
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer>
        {state.userToken == null ? (<AuthStack/>) : (<RootStack/>)}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
