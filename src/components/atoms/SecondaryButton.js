import React from 'react';
import { Button } from 'react-native-elements'
import Colors from '../../constants/Colors'
import { BTN_BORDER_WIDTH, BTN_CORNER_RADIUS, BTN_HEIGHT } from '../../constants/Numbers'

const SecondaryButton = props => { 
    return <Button
        title={props.title}
        onPress={props.onPress}
        loading={props.isLoading}
        type='outline'
        titleStyle={{
            color: Colors.accent,
        }}
        buttonStyle={{
            backgroundColor: 'white',
            borderRadius: BTN_CORNER_RADIUS,
            borderColor: Colors.accent,
            borderWidth: BTN_BORDER_WIDTH,
            padding: 10,
            height: BTN_HEIGHT,
        }}
        disabled={props.disabled}
    />
}

export default SecondaryButton