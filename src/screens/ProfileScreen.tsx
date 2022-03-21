import { collection, query, where, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Image, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { BackButton } from '../component/buttons/BackButton';
import { navInterface } from '../data/interface';
import { authentication, db } from '../firebase/firebase-config';
import { globalColors } from '../component/styles/Color';

export const ProfileScreen = ({ navigation }: navInterface) => {
    const [userData, setUserData] = useState<any>({})
    const [user, loading, error] = useAuthState(authentication);
    const getUserData = async () => {
        const collectionRef = collection(db, 'users');
        const q = query(collectionRef, where("email", '==', user?.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setUserData(doc.data())
            console.log({ userData });
        })
    }
    useEffect(() => {
        getUserData();
    }, []);

    return (
        <View >
            <View style={{
                backgroundColor: "#00BFFF",
                height: 200,
            }}></View>
            <BackButton />
            <Image style={{
                width: 130,
                height: 130,
                borderRadius: 63,
                borderWidth: 4,
                borderColor: "white",
                marginBottom: 10,
                alignSelf: 'center',
                position: 'absolute',
                marginTop: 130
            }}
                source={{ uri: userData.img }} />
            <View style={{ marginTop: 40, }}>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    padding: 30,
                }}>

                    <TouchableOpacity style={{
                        marginTop: 10,
                        height: 45,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 20,
                        width: 250,
                        borderRadius: 30,
                        backgroundColor: globalColors.lightBlue,
                    }}>
                        <Text>{userData.email}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        marginTop: 10,
                        height: 45,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 20,
                        width: 250,
                        borderRadius: 30,
                        backgroundColor: globalColors.lightCyan,
                    }}>
                        <Text>{userData.role}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        marginTop: 10,
                        height: 45,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 20,
                        width: 250,
                        borderRadius: 30,
                        backgroundColor: globalColors.lightYellow,
                    }}>
                        <Text>{userData.name}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
