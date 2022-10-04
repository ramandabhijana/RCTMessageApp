import React from "react";
import { View, Text } from "react-native";
import { Button, Icon } from 'react-native-elements';

const CustomNavigationBar = (
    {
        onPressDismiss,
        title,
    }
) => { 
    return (
        <View style={{
    height: 60,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    marginBottom: 10,
    alignItems: 'flex-start',
    justifyContent: 'center'
    }}
    > 
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 8,
        }}>
            <Button
                icon={<Icon name='arrow-back'/>}
                type='clear'
                onPress={() => onPressDismiss()}
                />
            <Text style={{fontSize: 18, marginLeft: 16, fontWeight: 'bold'}}>{title}</Text>
        </View>    
</View>
    )
}

export default CustomNavigationBar