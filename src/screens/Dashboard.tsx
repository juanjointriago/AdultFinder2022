import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper';
import { authentication, db } from '../firebase/firebase-config';
import { collection, getDocs} from 'firebase/firestore/lite';

export const Dashboard = () => {
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
      //for get data of user

    }).catch((e) => {
      console.warn(e)
    })
  }
  return (
    <Text>{user}</Text>
  )
}
