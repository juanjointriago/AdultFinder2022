import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { globalColors } from '../styles/Color';
import { globalStyles } from '../styles/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import { homeMenuCard } from '../interfaces/UIInterfaces';

export const HomeManuCard = ({ backgroundColor = globalColors.secondary, imageSrc = 'gift', descriptionText = 'no text', onPress, textSize = 18 }: homeMenuCard) => {
  return (
    <View style={[globalStyles.cardContainerGlobal, { backgroundColor: backgroundColor }]}>
            <TouchableOpacity
                onPress={onPress}>
                <View style={globalStyles.cardContainerStyle} >
                    <Icon name={imageSrc} color={globalColors.white} size={35} style={{ paddingTop: '20%', alignSelf: 'center' }} />
                </View>
                <Text style={[globalStyles.cardTextstyle, { fontSize: textSize, }]}>{descriptionText}</Text>
            </TouchableOpacity>
        </View>

  )
}
