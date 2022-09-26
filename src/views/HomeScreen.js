
import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import { Image } from 'react-native-elements'
import translate from '../locales/translate'
import Colors from '../constants/Colors'
import styles from '../constants/Styles'

const HomeScreen = (props) => {
    
    return (
        <>
        <StatusBar backgroundColor={Colors.primary}/>
        <View style={styles.container}>
            <Image 
                style={{width: 200, height: 200, marginBottom: 20}}
                source={require('../assets/images/timedoor.jpg')}/>
            <Text style={styles.welcomeText}>{translate('welcome')}</Text>
        </View>
        </>
    )
}

export default HomeScreen
