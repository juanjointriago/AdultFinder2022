import React, { useEffect, useState } from 'react';
import MapView, { Region, PROVIDER_DEFAULT, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { Text, View } from 'react-native';
import { Popup } from 'react-native-map-link';
import { globalStyles, mapsStyle } from '../component/styles/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalColors } from '../component/styles/Color';
import { BackButton } from '../component/buttons/BackButton';
import { coords, deltaCoords } from '../component/interfaces/UIInterfaces';
import { doc, getDoc, query, where, updateDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

export const MapViewScreen = () => {
    const [otherUserLocation, setotherUserLocation] = useState<coords>({
        lat: -0,
        lng: -0
    })
    const [location, setLocation] = useState<coords>({
        lat: 0,
        lng: 0
    });
    const [visiblePopup, setVisiblePopup] = useState(false)
    const [region, setRegion] = useState<Region>({
        latitude: 0,
        longitude: 0,
        latitudeDelta: deltaCoords.lat,
        longitudeDelta: deltaCoords.lng,
    });

    const setCordsFirebase = async (lat: number, lng: number) => {
        const docDeviceRef = doc(db, 'users', 'HP1mRnUOSGQUCcVrqJkg');
        await updateDoc(docDeviceRef, {
            currentLat: lat,
            currentLng: lng
        });
    };

    const getcurrentLoc = async () => {
        await Geolocation.getCurrentPosition((position) => {
            const currentLocation: coords = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            const currentRegion: Region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: deltaCoords.lat,
                longitudeDelta: deltaCoords.lng,
            }
            setCordsFirebase(position.coords.latitude, position.coords.longitude);
            setRegion(currentRegion)
            setLocation(currentLocation)


            //print
            //console.log(JSON.stringify(currentLocation));
        },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        )
    }


    const getAndsetCords = async () => {
        const docDeviceRef = doc(db, 'users', 'HP1mRnUOSGQUCcVrqJkg');

        const docDeviceSnap = await getDoc(docDeviceRef);
        if (docDeviceSnap.exists()) {
            console.log(docDeviceSnap);
            setotherUserLocation({
                lat: docDeviceSnap.data().currentLat,
                lng: docDeviceSnap.data().currentLng,
            })
        }

    }


    useEffect(() => {
        getcurrentLoc();
        getAndsetCords();
    }, [])


    return (
        <>
            <View style={globalStyles.genericContainerStyle}>
                <BackButton />
                <Popup
                    isVisible={visiblePopup}
                    onCancelPressed={() => setVisiblePopup(false)}
                    onAppPressed={() => setVisiblePopup(false)}
                    modalProps={{
                        animatioIn: 'slideInUp'
                    }}
                    options={
                        {
                            dialogMessage: 'Listado de apicaciones compatibles con navegacion desde AdulFinder',
                            dialogTitle: 'Navegar al paciente ????',
                            cancelText: 'Cancelar',
                            appsWhiteList: ['waze', 'google-maps'],
                            appTitles: { ['waze']: 'Waze Maps', ['google-maps']: 'Google Maps' },
                            latitude: otherUserLocation.lat,
                            longitude: otherUserLocation.lng,
                        }}
                    onBackButtonPressed={() => setVisiblePopup(false)}
                    appsWhiteList={['waze', 'google-maps',]}
                />
                <View style={{

                    alignSelf: 'center',
                    top: '5%',
                    backgroundColor: globalColors.neutral,
                    borderRadius: 10,
                    padding: '1%'
                }} >
                    <Text style={{
                        alignSelf: 'center',
                        fontSize: 35,
                        color: globalColors.white
                    }}> Llegar al paciente</Text>

                </View>
                <View style={{
                    marginTop: '20%',
                    alignSelf: 'center',
                    backgroundColor: globalColors.neutral,
                    borderRadius: 5
                    , marginHorizontal: '-2%',
                    padding: '1%',
                }}>
                    <Text style={{
                        top: '2%',
                        alignSelf: 'center',
                        fontSize: 14,
                        color: globalColors.white,
                        textAlignVertical: 'center'
                    }}> Presioneen el marcador rojo (Paciente), para poder abrir su navegaci??n
                    </Text>
                </View>
                <MapView
                    zoomEnabled
                    scrollDuringRotateOrZoomEnabled
                    customMapStyle={mapsStyle}
                    style={[globalStyles.absoluteFill, {
                        marginVertical: '50%',
                        height: '50%',
                        width: '100%',
                    }]}

                    provider={PROVIDER_DEFAULT}
                    region={region}
                >
                    <Marker
                        coordinate={
                            {
                                latitude: otherUserLocation.lat,
                                longitude: otherUserLocation.lng
                            }}
                        title={'Ubicaci??n de Paciente'}
                        description={`Ir a ubicaci??n del Paciente`}
                        onCalloutPress={
                            () => setVisiblePopup(true)
                        }
                    >
                        <Icon
                            name='walk-outline' size={30} color={globalColors.primary} />
                    </Marker>
                    <Marker
                        coordinate={
                            {
                                latitude: location.lat,
                                longitude: location.lng
                            }}
                        title={'Su ubicaci??n'}
                        description={`Punto de partida`}
                    >
                        <Icon
                            name='radio-outline' size={25} color={globalColors.secondary} />
                    </Marker>

                </MapView>
                <View style={{
                    marginTop: '140%',
                    alignSelf: 'center',
                    backgroundColor: globalColors.lightCyan,
                    borderRadius: 5
                    , marginHorizontal: '-2%',
                    padding: '1%',
                }}>
                    <Text style={{
                        top: '2%',
                        alignSelf: 'center',
                        fontSize: 14,
                        color: globalColors.gray,
                        textAlignVertical: 'center'
                    }}> Uniandes Sede Ibarra 2022
                    </Text>
                </View>
            </View>
        </>
    )
}
