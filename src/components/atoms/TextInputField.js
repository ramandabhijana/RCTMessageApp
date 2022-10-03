import React from 'react';
import { Input } from 'react-native-elements';
import Colors from '../../constants/Colors';

const TextInputField = (props) => { 
    return (
        <Input
            name={props.name}
            label={props.label}
            labelStyle={{
                color: 'black',
            }}
            placeholder={props.placeholder}
            errorStyle={{ color: Colors.error }}
            errorMessage={props.errorMessage}
            containerStyle={{
                marginVertical: 8
            }}
            keyboardType={props.keyboardType}
            onChangeText={props.onChangeText}
            onBlur={props.handleBlur}
            value={props.value}
            secureTextEntry={props.secureTextEntry}
        />
    )
}

export default TextInputField