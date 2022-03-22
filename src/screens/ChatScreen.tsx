import React, { useCallback, useLayoutEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { authentication, db } from '../firebase/firebase-config';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { collection, query, orderBy, addDoc, onSnapshot } from 'firebase/firestore';
import { AVATAR } from '../data/const';

export const ChatScreen = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const navigation = useNavigation();


  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        <TouchableOpacity>
        </TouchableOpacity>
      }
    })
  }, [navigation]);


  useLayoutEffect(() => {
    const collectionRef = collection(db, 'chat');
    const q = query(collectionRef, orderBy("createdAt", "desc"));
    const unsusbscribe = onSnapshot(q, snapshot => {
      console.log('snapshot');
      setMessages(
        snapshot.docs.map(doc => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      )
    });
    return () => unsusbscribe();
  }, [])

  const onSend = useCallback((messages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(db, 'chat'), {
      _id,
      createdAt,
      text,
      user
    })
  }, [])

  const uu: any = {
    _id: authentication?.currentUser?.email,
    avatar: AVATAR
  }
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={uu}
      placeholder={'Escriba un mensaje...'}
      alwaysShowSend
    />
  )
}
