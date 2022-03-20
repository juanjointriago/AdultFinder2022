import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { globalStyles } from '../styles/GlobalStyles';

/**
 *
 * @returns: component with rounded form
 * @author JJIV
 * @description: with the unique function for navigate with useNavigation hook for navigate go back
 * @version: 0.0.0.1
 * @argument: none
 */

export const BackButton = () => {
    const navigation = useNavigation();
    const goBack = () => {
        navigation.goBack();
    }

    return (
        <TouchableOpacity
            style={globalStyles.circleBack}
            onPress={goBack}>

            <Icon
                style={globalStyles.backButtonStyle}
                name='chevron-back'
                size={30}
                color='black'
            />
        </TouchableOpacity>
    )
};
