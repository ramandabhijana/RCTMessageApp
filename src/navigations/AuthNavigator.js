import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import TopScreen from '../views/TopScreen'
import LoginScreen from "../views/LoginScreen";
import RegisterScreen from "../views/RegisterScreen";
import translate from '../locales/translate';
import Keys from '../constants/Keys';
import { STANDARD_VIEW_SPACING } from '../constants/Numbers';
import Colors from '../constants/Colors';
import { StatusBar } from 'react-native';

const {Navigator, Screen} = createStackNavigator()

const baseStackNavOptions = { 
    headerTintColor: 'black',
    headerBackTitle: '',
}

export const AuthStack = () => { 
    return (
        <Navigator 
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    paddingBottom: STANDARD_VIEW_SPACING,
                    backgroundColor: 'white',
                },
            }}
        >
            <Screen 
                name="TopScreen"
                component={TopScreen}
                options={baseStackNavOptions}
            />
            <Screen 
                name="LoginScreen"
                component={LoginScreen}
                options={baseStackNavOptions}
                />
            <Screen 
                name="RegisterScreen" 
                component={RegisterScreen}
                options={baseStackNavOptions}
                />
        </Navigator>
        
    )
}