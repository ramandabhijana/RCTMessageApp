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
                fontWeight: '400',
                fontSize: 14
            }}
            placeholder={props.placeholder}
            errorStyle={{ color: Colors.error }}
            errorMessage={props.errorMessage}
            containerStyle={{
                marginVertical: 10
            }}
            inputStyle={{
                paddingLeft: 8
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