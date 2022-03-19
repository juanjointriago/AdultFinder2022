import React from 'react';
import { Text } from 'react-native';
import { globalStyles } from '../styles/GlobalStyles';

export const Header = ({title}: any) => {
    return <Text style={globalStyles.header}>{title}</Text>
}
