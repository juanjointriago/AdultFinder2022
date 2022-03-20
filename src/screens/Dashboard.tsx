import { signOut } from 'firebase/auth';
import React from 'react'
import { Text } from 'react-native-paper';
import { authentication } from '../firebase/firebase-config';

export const Dashboard = () => {
  const LogOut = () => {
    signOut(authentication).then((res) => {
      //for get data of user
    }).catch((e) => {
      console.warn(e)
    })
  }
  return (
    <Text>Dahboard</Text>
  )
}
