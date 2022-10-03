import React from 'react';
import { Button } from 'react-native-elements'
import Colors from '../../constants/Colors'
import { BTN_CORNER_RADIUS, BTN_HEIGHT } from '../../constants/Numbers'

const PrimaryButton = props => { 
    return <Button
        title={props.title}
        onPress={props.onPress}
        loading={props.isLoading}
        titleStyle={{
            color: 'white',
        }}
        buttonStyle={{
            backgroundColor: Colors.accent,
            borderRadius: BTN_CORNER_RADIUS,
            padding: 10,
            height: BTN_HEIGHT,
        }}
        disabled={props.disabled}
        loadingProps={{
            color: 'black',
        }}
    />
}

export default PrimaryButton