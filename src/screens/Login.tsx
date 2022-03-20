import React, { useState, useEffect } from 'react';
import { Button, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { navInterface } from '../data/interface';
import { globalColors } from '../component/styles/Color';
import { Background } from '../component/containers/Background';
import { BackButton } from '../component/buttons/BackButton';
import { Logo } from '../component/images/Logo';
import { Header } from '../component/containers/Header';
import { TextInput } from '../component/inputs/TextInput';
import { globalStyles } from '../component/styles/GlobalStyles';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authentication } from '../firebase/firebase-config';
import { emailValidator, passwordValidator } from '../data/helpers/Validators';
import { useAuthState } from "react-firebase-hooks/auth";


export const Login = ({ navigation }: navInterface) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [user, loading, error] = useAuthState(authentication);

  const onLoginPress = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    loginUser();
  }
  useEffect(() => {
    if(loading) return;
    if (user) navigation.navigate("Dashboard");
  }, [user, loading])
  

  const loginUser = () => {

    signInWithEmailAndPassword(authentication, email.value, password.value)
      .then((res) => {
        navigation.navigate('Dashboard');
      })
      .catch((e) => {
        console.warn(e);
      })
  }

  return (
    <Background>
      <BackButton />
      <Logo />
      <Header title='Ingresemos por aquí' />
      <TextInput
        error={!!email.error}
        errorText={email.error}
        returnKeyType="next"
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        label='Ingrese su Email'
        value={email.value}
        onChangeText={(text: any) => setEmail({ value: text, error: '' })}
      />
      <TextInput
        label='Ingrese su Contraseña'
        returnKeyType="done"
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        value={password.value}
        onChangeText={(text: any) => setPassword({ value: text, error: '' })} />
      <Button
        title='Continuar'
        color={globalColors.secondary}
        onPress={onLoginPress}
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
            <Text style={globalStyles.forgot}>Presiona aquí..!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  )
}
