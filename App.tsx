import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './src/component/navigation/Navigation';
import React, { useEffect } from 'react';
import { authentication } from './src/firebase/firebase-config';
import OneSignal from 'react-native-onesignal';



const App = () => {
  useEffect(() => {
    //OneSignal Init Code
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId("557b42e8-5d93-4bff-9a7a-f84d1d098938");
    //END OneSignal Init Code
    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log("OneSignal: notification opened:", notification);
    });
  }, [])

  return (
    <NavigationContainer>
      <Navigation/>
    </NavigationContainer>
  )
}
export default App;