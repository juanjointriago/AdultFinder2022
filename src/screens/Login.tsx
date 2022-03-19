import React from 'react';
import { Button, Image, View } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { navInterface } from '../data/interface';
import { globalColors } from '../component/styles/Color';
import { FAITHHOPE } from '../data/const';


export const Login = ({ navigation }: navInterface) => {
  return (
    <View>
      <Card>
        <Card.Content>
          <Image source={FAITHHOPE} style={{ height: '60%', width: '80%' }} />
          
          <Card.Actions>
            <Button title='No Tienes una Cuenta?' color={globalColors.lightBlue} onPress={() => navigation.navigate('Dashboard')} />
          </Card.Actions>
          <Card.Actions>
          <Button title='Continuar' color={globalColors.lightMint} onPress={() => navigation.navigate('Register')} />
          </Card.Actions>
        </Card.Content>

      </Card>
    </View>
  )
}
