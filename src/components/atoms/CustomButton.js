
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Colors from '../../constants/Colors';

const CustomButton = props => {
    return <Button
        {...props}
        styles={{ ...props.styles }}
        disabledTitleStyle={{ ...styles.disbledTitle }}
        disabledStyle={{ ...styles.buttonDisabled }}
        buttonStyle={props.types == "primary" ? styles.primary : styles.secondary}
        titleStyle={props.types == "primary" ? styles.titlePrimary : styles.titleSecondary}
        />
};

const styles = StyleSheet.create({
    primary: {
        borderRadius: 12,
        borderWidth: 1,
        height: 50,
        left: 0,
        right: 0,
        backgroundColor: Colors.primary,
    },
    secondary: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.primary,
        height: 50,
        backgroundColor: 'white',
    },
    buttonDisabled: {
        borderRadius: 12,
        borderWidth: 1,
        backgroundColor: Colors.greyLight,
        borderColor: Colors.greyLight,
    },
    titlePrimary: {
        fontSize: 18,
        fontFamily: 'Rubik-Bold'
    },
    titleSecondary: {
        fontSize: 18,
        fontFamily: 'Rubik-Bold',
        color: '#1644BD'
    },
    disbledTitle: {
        fontFamily: 'roboto-bold',
        fontSize: 14,
        color: 'white'
    }
});

export default CustomButton
