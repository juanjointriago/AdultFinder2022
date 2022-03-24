import React, { useState, useEffect } from 'react'
import OneSignal from 'react-native-onesignal';
import { Alert, Platform } from 'react-native';
import { ONE_SIGNAL_APP_ID } from '../../data/const';

const useOneSignal = () => {
    const [isSubscribed, setIsSubscribed] = useState<boolean | undefined>(false);

    useEffect(() => {
        const getDeviceState = async () => {
            const deviceState = await OneSignal.getDeviceState();
            setIsSubscribed(deviceState?.isSubscribed);
        }
        /* O N E S I G N A L   S E T U P */
        OneSignal.setAppId(ONE_SIGNAL_APP_ID);
        OneSignal.setLogLevel(6, 0);
        OneSignal.setRequiresUserPrivacyConsent(false);
        if (Platform.OS === "ios") {
            OneSignal.promptForPushNotificationsWithUserResponse(response => {
                console.log("Prompt response:", response);
            });
        }
         /* O N E S I G N A L  H A N D L E R S */
        OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
            console.log(
                "One signal : Notification will show in foreground:",
                { notifReceivedEvent }
            );
            let notif = notifReceivedEvent.getNotification();
            const buttonCancel = {
                text: 'Cancelar',
                onPress: () => { notifReceivedEvent.complete(); },
                style: 'cancel'
            };
            const buttonAccept = {
                text: 'Completado',
                onPress: () => {
                    notifReceivedEvent.complete(notif);
                }
            };
            Alert.alert(
                "Notificacion Completada",
                'Test',
                [buttonCancel, buttonAccept],
                { cancelable: true }
            );
        });
        OneSignal.setNotificationOpenedHandler(notification => {
            console.log("OneSignal: notificación abierta:", notification);
        });
        OneSignal.setInAppMessageClickHandler(event => {
            console.log("OneSignal me presionaste we:", event);
        });
        OneSignal.addEmailSubscriptionObserver((event) => {
            console.log("OneSignal: la suscripcion de email cambió: ", event);
        });
        OneSignal.addSubscriptionObserver(event => {
            console.log("OneSignal: subscription cambiada:", event);
            setIsSubscribed(event.to.isSubscribed);
        });
        OneSignal.addPermissionObserver(event => {
            console.log("OneSignal: permisos cambiados:", event);
        });
        getDeviceState();
    });
    return isSubscribed;
}
export default {
    title: 'Push Notifications',
    hook: useOneSignal
}