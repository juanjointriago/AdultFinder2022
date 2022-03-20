import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { Dashboard } from '../../screens/Dashboard';
import { Login } from '../../screens/Login';
import { MapViewScreen } from '../../screens/MapViewScreen';
import { Register } from '../../screens/Register';
import { ResetPasswordScreen } from '../../screens/ResetPasswordScreen';
import { Welcome } from '../../screens/Welcome';
import { request, PERMISSIONS } from 'react-native-permissions';
import { Platform } from 'react-native';


const Stack = createStackNavigator();
export const Navigation = () => {

  const [permissionResult, setPermissionResult] = useState("No ha permitido acceso a Ubicación")

    useEffect(() => {
        request(Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
            setPermissionResult(result)
        })
    }, [])

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
        <Stack.Screen name='MapViewScreen' component={MapViewScreen}/>
    </Stack.Navigator>
  )
}
