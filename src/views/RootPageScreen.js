import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { removeStoredAuthData } from '../services/AuthService';
import { AuthContext } from '../../App';

function HomeScreen() {
  const { signOut } = React.useContext(AuthContext)

  const onTapSignOut = async () => { 
    try { 
        await removeStoredAuthData()
        signOut()
    } catch (error) { 
        console.log(error)
    }
}

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button 
        title='Sign Out' 
        onPress={() => onTapSignOut()}
        />
    </View>
  );
}

function MessagesScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Messages!</Text>
    </View>
  );
}

function MyPageScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>My Page!</Text>
      </View>
    );
  }

const Tab = createBottomTabNavigator();

export const RootStack = () => { 
    return (
        <Tab.Navigator>
            <Tab.Screen name="Feed" component={HomeScreen} />
            <Tab.Screen name="Messages" component={MessagesScreen} />
            <Tab.Screen name="MyPage" component={MyPageScreen} />
        </Tab.Navigator>
    )
}