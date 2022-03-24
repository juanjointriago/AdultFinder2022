import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { authentication, db } from '../firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { navInterface } from '../data/interface';
import { HomeManuCard } from '../component/containers/HomeManuCard';
import { Image, ScrollView, View, Text } from 'react-native';
import { globalStyles } from '../component/styles/GlobalStyles';
import { BackButton } from '../component/buttons/BackButton';
import { globalColors } from '../component/styles/Color';
import { ICON } from '../data/const';

export const Dashboard = ({ navigation }: navInterface) => {
  const [user, setUser] = useState({})
  
  useEffect(() => {
    const getUserData = async () => {
      const userData = collection(db, 'users');
      const usersnapshot = await getDocs(userData);
      const userList = usersnapshot.docs.map(doc => doc.data());
      setUser(userList)
      console.log(JSON.stringify(user));
    }
    getUserData()
  }, [])

  const LogOut = () => {
    signOut(authentication).then((res) => {
      navigation.navigate('Login')
    }).catch((e) => {
      console.warn(e)
    })
  }
  return (
    <View>
      <BackButton />
      <ScrollView style={{ marginTop: '10%' }}>
        <View style={{flexDirection: 'row', padding: '10%'}}>
          <Text style={{alignSelf: 'flex-end', fontSize: 34}}>Bienvenido </Text>
        <Image source={ICON} style={{width: 75, height: 75, alignSelf: 'flex-end'}} />
        </View>
        <View>
          <View style={globalStyles.cardTwoConatinerStyle}>
            <HomeManuCard
              descriptionText='Ubicar paciente'
              imageSrc='walk-outline'
              onPress={() => navigation.navigate('MapViewCIrcleScreen')}
            />
            <HomeManuCard
              descriptionText='Llegar al paciente'
              imageSrc='navigate-outline'
              onPress={() => navigation.navigate('MapViewScreen')}
              backgroundColor={globalColors.gray}
            />
          </View>
          <View style={globalStyles.cardTwoConatinerStyle}>

            <HomeManuCard
              descriptionText='Perfil Usuario'
              imageSrc='options-outline'
              backgroundColor={globalColors.gray}
              onPress={() => navigation.navigate('ProfileScreen')}
            />
            <HomeManuCard
              descriptionText='Mensajes'
              imageSrc='chatbubbles-outline'
              onPress={() => navigation.navigate('ChatScreen')}
               />
          </View>
          <View style={globalStyles.cardTwoConatinerStyle}>

            <HomeManuCard
              descriptionText='Perímetro'
              imageSrc='radio-outline'
              onPress={() => navigation.navigate('PerimeterScreen')}
              />
            <HomeManuCard
              descriptionText='Salir'
              imageSrc='log-out-outline'
              backgroundColor={globalColors.gray}
              onPress={LogOut}
            />
          </View>
          
        </View>
      </ScrollView>
    </View>
  )
}
