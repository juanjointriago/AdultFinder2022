import React from 'react'
import { View, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../styles/theme'

interface textInputInterface {
    errorText:string, 
    description: string, 
    label: string, 
    returnKeyType: string, 
    autocomplete: string, 
    textContentType:string, 
    keyboardType: string, 
    onChangeText: ()=> void | undefined, 
    value: any, 
    secureTextEntry: boolean
}

export const TextInput = ({ errorText, description, label, returnKeyType, autocomplete, textContentType, keyboardType, onChangeText, value, secureTextEntry, placeholder}: any) => {
    return (
        <View style={{
            width: '100%',
            marginVertical: 12,
        }}>
            <Input
                style={{
                    backgroundColor: theme.colors.surface,
                }}
                selectionColor={theme.colors.primary}
                underlineColor={'transparent'}
                mode={'outlined'}
                label={label}
                returnKeyType={returnKeyType}
                autoCapitalize='none'
                autoComplete={autocomplete}
                textContentType={textContentType}
                keyboardType={keyboardType}
                onChangeText={onChangeText}
                value={value}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
            />
            {description && !errorText ? (
                <Text style={{
                    fontSize: 13,
                    color: theme.colors.secondary,
                    paddingTop: 8,
                }}> {description}</Text>
            ) : null}
            {errorText ? <Text style={{ fontSize: 13, color: theme.colors.error, paddingTop: 8, }}>{errorText}</Text> : null}
        </View>
    )
}
