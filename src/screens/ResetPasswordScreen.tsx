import React, { useState } from 'react'
import { BackButton } from '../component/buttons/BackButton'
import { Button } from '../component/buttons/Button'
import { Background } from '../component/containers/Background'
import { Header } from '../component/containers/Header'
import { Logo } from '../component/images/Logo'
import { TextInput } from '../component/inputs/TextInput'
import { emailValidator } from '../data/helpers/Validators'
import { navInterface } from '../data/interface'

export const ResetPasswordScreen = ({ navigation }: navInterface) => {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState('')
    const sendResetPasswordEmail = () => {
        const emailError = emailValidator(email.value)
        if (emailError) {
            setEmail({ ...email, error: emailError })
            return
        }
        navigation.navigate('Login')
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
                style={{ marginTop: 16 }}>
                Recuperar Contraseña
            </Button>
        </Background>
    )
}
