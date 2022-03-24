import { Navigation } from './src/component/navigation/Navigation';
import React, { useEffect } from 'react';
import OneSignal from 'react-native-onesignal';
import { Provider } from 'react-native-paper';
import { AuthenticatedUserProvider } from './src/data/AuthenticatedUserProvider';
import { LogBox } from 'react-native';



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
  // Ignore log notification by message:
  LogBox.ignoreAllLogs();
  return (
    <Provider>
      <AuthenticatedUserProvider>
        <Navigation />
      </AuthenticatedUserProvider>
    </Provider>
  )
}
export default App;