import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { authentication, db } from '../firebase/firebase-config';
import { collection, getDocs} from 'firebase/firestore/lite';
import { navInterface } from '../data/interface';
import { HomeManuCard } from '../component/containers/HomeManuCard';
import { ScrollView, View } from 'react-native';
import { globalStyles } from '../component/styles/GlobalStyles';
import { BackButton } from '../component/buttons/BackButton';

export const Dashboard = ({navigation}:navInterface) => {
  const [user, setUser] = useState({})
  const getUserData = async () =>{
    const userData = collection(db, 'users');
    const usersnapshot = await getDocs(userData);
    const userList = usersnapshot.docs.map(doc => doc.data());
    setUser( userList )

  }
  useEffect(() => {
    getUserData
  }, [getUserData])
  
  const LogOut = () => {
    signOut(authentication).then((res) => {

    }).catch((e) => {
      console.warn(e)
    })
  }
  return (
    <View>
      <BackButton/>
      <ScrollView style={{ marginTop: '20%' }}>
        <View>
          <View style={globalStyles.cardTwoConatinerStyle}>
            <HomeManuCard 
            descriptionText='MONITOREAR AL PACIENTE'/>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
