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
import { dniValidator, emailValidator, nameValidator, passwordValidator, phoneValidator } from '../data/helpers/Validators';
import { navInterface } from '../data/interface';
import { PaperSelect } from 'react-native-paper-select';
import { ScrollView } from 'react-native-gesture-handler';
import { addDoc, collection } from 'firebase/firestore';
import { db, authentication } from '../firebase/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const Register = ({ navigation }: navInterface) => {

  const [dni, setDni] = useState({ value: '', error: '' });
  const [phone, setPhone] = useState({ value: '', error: '' });
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
  const [gender, setGender] = useState({
    value: '',
    list: [
      { _id: 'Masculino', value: 'Masculino' },
      { _id: 'Femenino', value: 'Femenino' },
    ],
    selectedList: [],
    error: '',
  });
  const [user, setUser] = useState({
    name: name,
    email: email,
    password: password,
    role: role,
    gender: gender,
    img: '',
    currentLat: 0,
    currentLng: 0,
    dni: dni,
    phone: phone,
  })


  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const phoneError = phoneValidator(phone.value);
    const dniError = dniValidator(dni.value);

    if (emailError || passwordError || nameError || phoneError || dniError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setPhone({ ...phone, error: phoneError });
      setDni({ ...dni, error: dniError });
      return
    }
    createUserWithEmailAndPassword(authentication, email.value, password.value)
    await addDoc(collection(db, 'users',)
      , {
        name: name.value,
        email: email.value,
        password: password.value,
        role: role.value,
        gender: gender.value,
        img: '',
        currentLat: 0,
        currentLng: 0,
        dni: dni.value,
        phone: phone.value
      });
    console.log('Usuario agregado exitosamente: ', { user });
    //send data to firebase
    navigation.navigate('Login');
  }


  return (

    <Background>
      <BackButton />
      <ScrollView style={{ width: '100%', marginBottom: '3%' }}>
        <Logo />
        <Header Title='Formulario de Registro' />
        <TextInput
          label="Ingrese su nombre"
          returnKeyType="next"
          value={name.value}
          onChangeText={(text: any) => setName({ value: text, error: '' })}
          error={!!name.error}
          errorText={name.error}
        />
        <TextInput
          label="Ingrese su Nro de Cédula"
          returnKeyType="next"
          keyboardType='numeric'
          value={dni.value}
          onChangeText={(text: any) => setDni({ value: text, error: '' })}
          error={!!dni.error}
          errorText={dni.error}
        />
        <TextInput
          label="Ingrese su Nro de Teléfono"
          returnKeyType="next"
          keyboardType='phone-pad'
          value={phone.value}
          onChangeText={(text: any) => setPhone({ value: text, error: '' })}
          error={!!phone.error}
          errorText={phone.error}
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
        <PaperSelect
          label='Seleccione su Género'
          value={gender.value}
          onSelection={(value: any) => {
            setGender(
              {
                ...gender,
                value: value.text,
                selectedList: value.selectedList,
                error: '',
              })
          }}
          arrayList={[...gender.list]}
          selectedArrayList={gender.selectedList}
          errorText={gender.error}
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
      </ScrollView>
    </Background>
  )
}
