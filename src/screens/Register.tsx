import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { BackButton } from '../component/buttons/BackButton';
import { Background } from '../component/containers/Background';
import { Header } from '../component/containers/Header';
import { Logo } from '../component/images/Logo';
import { TextInput } from '../component/inputs/TextInput';
import { globalColors } from '../component/styles/Color';
import { globalStyles } from '../component/styles/GlobalStyles';
import { emailValidator, nameValidator, passwordValidator } from '../data/helpers/Validators';
import { navInterface } from '../data/interface';
import { PaperSelect } from 'react-native-paper-select';

export const Register = ({ navigation }: navInterface) => {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [role, setRole] = useState({
    value: '',
    list: [
      { _id: 'Cuidador', value: 'Cuidador' },
      { _id: 'Paciente', value: 'Paciente' },
    ],
    selectedList: [],
    error: '',
  });

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    //send data to firebase
    navigation.navigate('Login');
  }


  return (
    <Background>
      <BackButton />
      <Logo />
      <Header />
      <TextInput
        label="Ingrese su nombre"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text: any) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <PaperSelect
        label='Seleccione su Rol'
        value={role.value}
        onSelection={(value: any) => {
          setRole(
            {
              ...role,
              value: value.text,
              selectedList: value.selectedList,
              error: '',
            })
        }}
        arrayList={[...role.list]}
        selectedArrayList={role.selectedList}
        errorText={role.error}
        multiEnable={false}
      />
      <TextInput
        label="Ingrese su email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text: any) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Ingrese su contraseña"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text: string) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Registrarse
      </Button>
      <View style={globalStyles.row}>
        <Text style={{ color: globalColors.white }}>Ya tienes una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={globalStyles.forgot}>Continúa por aquí..!</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}
