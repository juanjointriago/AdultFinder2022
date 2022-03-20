import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Dashboard } from '../../screens/Dashboard';
import { Login } from '../../screens/Login';
import { Register } from '../../screens/Register';
import { ResetPasswordScreen } from '../../screens/ResetPasswordScreen';
import { Welcome } from '../../screens/Welcome';


const Stack = createStackNavigator();
export const Navigation = () => {
  return (
    <Stack.Navigator 
    screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name='WelcomeScreen' component={Welcome}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Register' component={Register}/>
        <Stack.Screen name='ResetPasswordScreen' component={ResetPasswordScreen}/>
        <Stack.Screen name='Dashboard' component={Dashboard}/>
    </Stack.Navigator>
  )
}
