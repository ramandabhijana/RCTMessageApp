import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { ListItem, Image } from 'react-native-elements';
import { Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import CustomButton from '../atoms/CustomButton';

const GenericCustomAlertComponents = (props) => {

    const data = props.listData
    return (
        <View {...props} style={{ margin: 20, flexDirection: 'column' }}>
            <Text style={{ fontFamily: 'Rubik-Bold', fontSize: 18, marginBottom: 10, alignSelf: 'center' }}>{props.dialogTitle}</Text>
            {props.isDoubleButton ?
                <View style={{ flexDirection: 'row', display: 'flex', marginTop: 10 }}>
                    <View style={{ flex: 1 }}>
                        <CustomButton types='secondary' onPress={props.onNegativePress} title={props.negativeTitle ? props.negativeTitle : translate('cancel')} />
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <CustomButton types='primary' onPress={props.onPositivePress} title={props.positiveTitle ? props.positiveTitle : translate('retry')} />
                    </View>
                </View>
                :
                <View style={{ flexDirection: 'row', display: 'flex', marginTop: 10 }}>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <CustomButton types='primary' onPress={props.onPositivePress} title={props.positiveTitle ? props.positiveTitle : translate('ok')} />
                    </View>
                </View>
            }
        </View>
    )
}

export default GenericCustomAlertComponents

