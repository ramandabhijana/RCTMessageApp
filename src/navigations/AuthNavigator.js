import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import TopScreen from '../views/TopScreen'
import LoginScreen from "../views/LoginScreen";
import RegisterScreen from "../views/RegisterScreen";
import translate from '../locales/translate';
import Keys from '../constants/Keys';
import { STANDARD_VIEW_SPACING } from '../constants/Numbers';

const {Navigator, Screen} = createStackNavigator()

const baseStackNavOptions = { 
    headerTintColor: 'black',
    headerBackTitle: '',
}

export const AuthStack = () => { 
    return (
        <Navigator 
            screenOptions={{
                cardStyle: {
                    paddingBottom: STANDARD_VIEW_SPACING,
                    backgroundColor: 'white',
                },
            }}
        >
            <Screen 
                name="TopScreen"
                component={TopScreen}
                options={{headerShown: false}}
            />
            <Screen 
                name="LoginScreen"
                component={LoginScreen}
                options={{
                    ...baseStackNavOptions,
                    title: translate(Keys.login),
                }}
                />
            <Screen 
                name="RegisterScreen" 
                component={RegisterScreen}
                options={{
                    ...baseStackNavOptions,
                    title: translate(Keys.register),
                }}
                />
        </Navigator>
    )
}