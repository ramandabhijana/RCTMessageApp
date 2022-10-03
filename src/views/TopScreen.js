import React from 'react';
import { View, Text, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from "../components/atoms/PrimaryButton";
import SecondaryButton from "../components/atoms/SecondaryButton";
import Keys from '../constants/Keys';
import { STANDARD_VIEW_SPACING } from "../constants/Numbers";
import translate from "../locales/translate";

const TopScreen = ({ navigation }) => { 
    return (
        <>
            <StatusBar/>
            <SafeAreaView style={styles.topScreenContainer}>
                <Text style={styles.appNameText}>{translate(Keys.appName)}</Text>
                <Buttons navigation={navigation}/>
            </SafeAreaView>
        </>
    )
}

const Buttons = props => { 
    return (
    <View>
        <PrimaryButton 
            title={translate(Keys.login)}
            loading={false}
            onPress={() => {
                props.navigation.navigate('LoginScreen')
            }}
        />
        <View style={{marginBottom: 16}}/>
        <SecondaryButton 
            title={translate(Keys.register)}
            loading={false}
            onPress={() => {
                props.navigation.navigate('RegisterScreen')
            }}
        />
    </View>
    )
}

const styles = StyleSheet.create({
    topScreenContainer: { 
        flex: 1,
        alignItems: 'stretch',
        padding: STANDARD_VIEW_SPACING,
        justifyContent: 'flex-end',
        backgroundColor: 'white'
    },
    appNameText: { 
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'black',
        fontSize: 32,
        marginBottom: 40
    }
})

export default TopScreen