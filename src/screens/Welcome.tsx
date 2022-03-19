import React from 'react';
import { Image, View } from 'react-native';
import { MAIN_IMAGE } from '../data/const';
import { Button, } from 'react-native-paper';
import { navInterface } from '../data/interface';

export const Welcome = ({ navigation }: navInterface) => {
  return (
    <View >
      <Image source={MAIN_IMAGE} style={{
        height: '90%',
        width: '98%',
        marginBottom: '3%'
      }} />
      <Button color='blue' mode='contained' onPress={() => navigation.navigate('Login')}>
        {'Continuar '}
      </Button>
    </View>
  )
}
