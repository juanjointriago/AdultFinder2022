import { createStackNavigator } from '@react-navigation/stack'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Dashboard } from '../../screens/Dashboard';
import { Login } from '../../screens/Login';
import { MapViewScreen } from '../../screens/MapViewScreen';
import { Register } from '../../screens/Register';
import { ResetPasswordScreen } from '../../screens/ResetPasswordScreen';
import { Welcome } from '../../screens/Welcome';
import { request, PERMISSIONS } from 'react-native-permissions';
import { Platform, View } from 'react-native';
import { MapViewCIrcleScreen } from '../../screens/MapViewCIrcleScreen';
import { ChatScreen } from '../../screens/ChatScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from '../../firebase/firebase-config';
import { AuthenticatedUserContext } from '../../data/AuthenticatedUserProvider';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import { ProfileScreen } from '../../screens/ProfileScreen';



function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='WelcomeScreen' component={Welcome} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='ResetPasswordScreen' component={ResetPasswordScreen} />
    </Stack.Navigator>
  )
}

function LogedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='WelcomeScreen' component={Welcome} />
      <Stack.Screen name='Dashboard' component={Dashboard} />
      <Stack.Screen name='MapViewScreen' component={MapViewScreen} />
      <Stack.Screen name='MapViewCIrcleScreen' component={MapViewCIrcleScreen} />
      <Stack.Screen name='ChatScreen' component={ChatScreen} />
      <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
      
    </Stack.Navigator>
  )
}

const Stack = createStackNavigator();
export const Navigation = () => {
  const { user, setUser }: any = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  const [permissionResult, setPermissionResult] = useState("No ha permitido acceso a Ubicación")

  useEffect(() => {
    request(Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
      setPermissionResult(result)
    })
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      authentication,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {user ? <LogedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
