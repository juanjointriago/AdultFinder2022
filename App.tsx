import { Navigation } from './src/component/navigation/Navigation';
import React, { useEffect } from 'react';
import OneSignal from 'react-native-onesignal';
import { Provider } from 'react-native-paper';
import { AuthenticatedUserProvider } from './src/data/AuthenticatedUserProvider';
import { LogBox } from 'react-native';
import { ONE_SIGNAL_APP_ID } from './src/data/const';



const App = () => {
  useEffect(() => {
    //OneSignal Init Code
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId(ONE_SIGNAL_APP_ID);
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