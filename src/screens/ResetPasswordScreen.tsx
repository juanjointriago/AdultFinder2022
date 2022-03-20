import { sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'
import { Alert } from 'react-native'
import { BackButton } from '../component/buttons/BackButton'
import { Button } from '../component/buttons/Button'
import { Background } from '../component/containers/Background'
import { Header } from '../component/containers/Header'
import { Logo } from '../component/images/Logo'
import { TextInput } from '../component/inputs/TextInput'
import { emailValidator } from '../data/helpers/Validators'
import { navInterface } from '../data/interface'
import { authentication } from '../firebase/firebase-config';

export const ResetPasswordScreen = ({ navigation }: navInterface) => {
    const [email, setEmail] = useState({ value: '', error: '' });
    const sendPasswordReset = async (email:any) => {
        try {
          await sendPasswordResetEmail(authentication, email);
          Alert.alert(`Hemos enviado un email de restauraciónde contraseña a  ${email}`);
        } catch (err) {
          console.error(err);
        }
      };
    const sendResetPasswordEmail = () => {
        const emailError = emailValidator(email.value)
        if (emailError) {
            setEmail({ ...email, error: emailError })
            return
        }
        sendPasswordReset(email);
    }
    return (
        <Background>
            <BackButton />
            <Logo />
            <Header title='Para Recuperar tu contraseña, escribe tu email aquí abajo ¬' />
            <TextInput
                returnKeyType="done"
                placeholder='Ingrese su Email'
                value={email.value}
                onChangeText={(text: string) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                description="Debes Recibir a tu email un enlace de verificación y cambio de contraseña"
            />
            <Button
                mode='conatined'
                onPress={sendResetPasswordEmail}
                style={{ 
                    marginTop: 16}}>
                Recuperar Contraseña
            </Button>
        </Background>
    )
}
