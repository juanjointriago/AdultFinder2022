import React from 'react';
import { Button as PaperButton } from 'react-native-paper';
import { theme } from '../styles/theme';

export const Button = ({ mode, style, onPress,...props }: any) => {
    return (
        <PaperButton
            style={[
                {
                    width: '100%',
                    marginVertical: 10,
                    paddingVertical: 2
                },
                mode === 'outlined' && { backgroundColor: theme.colors.error },
                style
            ]}
            labelStyle={{
                fontWeight: 'bold',
                fontSize: 15,
                lineHeight: 26,
            }}
            mode={mode} 
            {...props}/>
    )
}
