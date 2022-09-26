/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useMemo, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { ThemeProvider, Icon } from 'react-native-elements';
import commonReducer from './src/reducers/commonReducers';
import * as RNLocalize from 'react-native-localize'
import i18n from 'i18n-js'
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider, useSelector } from 'react-redux';
import ReduxThunk from 'redux-thunk'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/views/HomeScreen'
import translate from './src/locales/translate'

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

const Stack = createStackNavigator();
export const AuthContext = React.createContext();



const App: () => React$Node = () => {

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


  setI18nConfig()

  const authContextValue = useMemo(
    () => ({
      signIn: async data => {
        try {
          const uid = await AsyncStorage.getItem(StorageKey.KEY_USER_ID)
          dispatch({ type: 'SIGN_IN', token: uid });
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

  useEffect(() => {
    // SplashScreen.hide();

    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem(StorageKey.KEY_USER_ID);
        console.log('token' + userToken)
      } catch (e) {
        // Restoring token failed
        console.log(e)
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();

  }, [])



  return (
    <SafeAreaProvider>
      <ThemeProvider
        theme={theme}>
        <Provider store={store}>
          <NavigationContainer>
            <AuthContext.Provider value={authContextValue}>
              <Stack.Navigator>
                {
                  state.userToken ? (
                    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                  ) : (
                      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                    )
                }
              </Stack.Navigator>
            </AuthContext.Provider>
          </NavigationContainer>
        </Provider>
      </ThemeProvider>
    </SafeAreaProvider>

  );
};

export default App;
