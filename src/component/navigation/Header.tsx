import React from 'react';
import {Text, View} from "react-native";
import { BackButton } from '../buttons/BackButton';
import { IconButton } from '../buttons/IconButton';
import { header } from '../interfaces/UIInterfaces';
import { globalStyles } from '../styles/GlobalStyles';
import { TextHeader } from '../text/TextHeader';


export const Header = ({ title = null, isBackButton = true, isRightButton = true, typeRightButton = 'notification', typeLeftButton = 'back' }: header) => {
    const renderLeftButton = () => {
        switch (typeLeftButton) {
            case 'back':
                return <BackButton />;
        }
    }

    const renderRightButton = () => {
        switch (typeRightButton) {
            case 'notification':
                return <IconButton iconName={'bell'} onPress={() => console.log('Notificaciones')} />;
        }
    }

    return (
        <View style={[globalStyles.headerContainer, globalStyles.center]}>
            <View style={[globalStyles.center, globalStyles.container]}>
                {
                    isBackButton && typeLeftButton ?
                        renderLeftButton()
                        : null
                }
            </View>
            <View style={[globalStyles.titleContainer, globalStyles.center]}>

                {
                    title ?
                        <TextHeader text={title} type={'h1'} />
                        : null
                }
            </View>
            <View style={[globalStyles.center, globalStyles.container]}>
                {
                    isRightButton && typeRightButton ?
                        renderRightButton()
                        : null
                }
            </View>
        </View>);
}
