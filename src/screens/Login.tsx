import React, { useState } from 'react';
import { Button, Image, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { navInterface } from '../data/interface';
import { globalColors } from '../component/styles/Color';
import { Background } from '../component/containers/Background';
import { BackButton } from '../component/buttons/BackButton';
import { Logo } from '../component/images/Logo';
import { Header } from '../component/containers/Header';
import { TextInput } from '../component/inputs/TextInput';
import { globalStyles } from '../component/styles/GlobalStyles';


export const Login = ({ navigation }: navInterface) => {
  const [isSigned, setIsSigned] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  return (
    <Background>
      <BackButton />
      <Logo />
      <Header title='Ingresemos por aquí' />
      <TextInput
        placeholder='Ingrese su Email'
        value={email}
        onChangeText={(text: any) => setEmail(text)}
      />
      <TextInput placeholder='Ingrese su Contraseña' value={password} secureTextEntry onChangeText={(text: any) => setPassword(text)} />
      <Button
        title='Continuar'
        color={globalColors.secondary}
        onPress={() => navigation.navigate('Dashboard')}
      />
      <View style={{ margin: '5%' }}>
        <View style={globalStyles.row}>
          <Text style={{ color: globalColors.white }}>No tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.replace('Register')}>
            <Text style={globalStyles.forgot}>Registrate aquí..!</Text>
          </TouchableOpacity>
        </View>
        <View style={globalStyles.row}>
          <Text style={{ color: globalColors.white }}>Olvidaste tu contraseña? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPasswordScreen')}
          >
            <Text style={globalStyles.forgot}>presiona aquí..!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  )
}
