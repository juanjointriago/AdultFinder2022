import { collection, query, where, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Image, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { BackButton } from '../component/buttons/BackButton';
import { navInterface } from '../data/interface';
import { authentication, db } from '../firebase/firebase-config';
import { globalColors } from '../component/styles/Color';
import { ONE_SIGNAL_API_REST_KEY, ONE_SIGNAL_APP_ID } from '../data/const';

export const ProfileScreen = ({ navigation }: navInterface) => {
    const [userData, setUserData] = useState<any>({})
    const [user, loading, error] = useAuthState(authentication);
    const getUserData = async () => {
        const collectionRef = collection(db, 'users');
        const q = query(collectionRef, where("email", '==', user?.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setUserData(doc.data())
        })
    }


    const sendMessage1 = async (
        data: any, id: any) => {
        let headers = {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: "Basic 'MGQ2ZTVmMDItODNkNi00N2U4LThkMWQtODZkZDc0OGJkZDUx'",
        };
        let endpoint = 'https://onesignal.com/api/v1/notifications';
        let params = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                app_id: '557b42e8-5d93-4bff-9a7a-f84d1d098938',
                filters: [   // Will send notification only to specific device
                    {          // Optional
                        field: 'tag',
                        key: 'Id',
                        relation: '=',
                        value: id,
                    },
                ],
                headings: { en: 'AdultFinder' },
                contents: { en: data },
                url: 'https://something.any', // optional
            }),
        };
        fetch(endpoint, params).then(res => console.log(JSON.stringify(res)));
    }

    const sendMessage = (data: string) => {
        let headers = {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: "Basic MGQ2ZTVmMDItODNkNi00N2U4LThkMWQtODZkZDc0OGJkZDUx"
        };

        let endpoint = "https://onesignal.com/api/v1/notifications";

        let params = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                app_id: "557b42e8-5d93-4bff-9a7a-f84d1d098938",
                included_segments: ["All"],
                contents: { en: data }
            })
        };
        fetch(endpoint, params).then(res => console.log(res));
    };




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

                    {(user?.email === 'juanintriagovillarrealdev@gmail.com' ?
                        <>
                            <TouchableOpacity style={{
                                marginTop: 10,
                                height: 45,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 20,
                                width: 250,
                                borderRadius: 30,
                                backgroundColor: globalColors.secondary,
                            }}
                                onPress={() => sendMessage('El Paciente Salió del Perímetro 👴🦼')}>
                                <Text>Creado por Juan Intriago Villarreal</Text>
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
                                backgroundColor: globalColors.secondary,
                            }}
                                onPress={() => sendMessage('El Paciente está en Zona Segura ❤️')}>
                                <Text>Creado por Juan Intriago Villarreal</Text>
                            </TouchableOpacity>
                        </> : null)}
                </View>
            </View>
        </View>
    )
}
