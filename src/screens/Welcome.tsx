import React, { useContext, useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { MAIN_IMAGE } from '../data/const';
import { Button, } from 'react-native-paper';
import { navInterface } from '../data/interface';
import { AuthenticatedUserContext } from '../data/AuthenticatedUserProvider';

export const Welcome = ({ navigation }: navInterface) => {
  const { user, setUser }: any = useContext(AuthenticatedUserContext);
  const [destiny, setdestiny] = useState('')
  useEffect(() => {
    if (user) {
      setdestiny('Dashboard')
    } else
      setdestiny('Login')

  }, [])


  return (
    <View >
      <Image source={MAIN_IMAGE} style={{
        height: '90%',
        width: '98%',
        marginBottom: '3%'
      }} />
      <Button color='blue' mode='contained' onPress={() => navigation.navigate(destiny)}>
        {'Continuar '}
      </Button>
    </View>
  )
}
