import React, { Children, ReactChildren } from 'react'
import { ImageBackground, KeyboardAvoidingView } from 'react-native'
import { LOGIN_BACKGROUND } from '../../data/const';
import { theme } from '../styles/theme';

interface background {
    children: JSX.Element | JSX.Element[] | ReactChildren | ReactChildren[]
}
export const Background = ({ children }:background) => {
    return (
        <ImageBackground
            source={LOGIN_BACKGROUND}
            resizeMode={'cover'}
            style={{
                flex: 1,
                width: '100%',
                backgroundColor: theme.colors.surface,
            }}
        >
            <KeyboardAvoidingView style={{
                flex: 1,
                padding: 20,
                width: '100%',
                maxWidth: 340,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
            }}
                behavior="padding"
                >
                {children}
            </KeyboardAvoidingView>
        </ImageBackground>
    )
}
