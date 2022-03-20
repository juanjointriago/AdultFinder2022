import React, { useEffect, useState } from 'react';
import MapView, { Region, PROVIDER_DEFAULT, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { View } from 'react-native';
import { Popup } from 'react-native-map-link';
import { globalStyles, mapsStyle } from '../component/styles/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalColors } from '../component/styles/Color';
import { BackButton } from '../component/buttons/BackButton';
import { coords, deltaCoords } from '../component/interfaces/UIInterfaces';

export const MapViewScreen = () => {
    const otherUserLocation: coords = {
        lat: -2.0968673,
        lng: -79.8944256
    }
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
    })
    const getcurrentLoc = () => {
        Geolocation.getCurrentPosition((position) => {
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


    useEffect(() => {
        getcurrentLoc();
    }, [])


    return (
        <>
            <View style={globalStyles.genericContainerStyle}>
                <BackButton/>
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
                            dialogTitle: 'Abra su Mapa preferido',
                            cancelText: 'Cancelar',
                            appsWhiteList: ['waze', 'google-maps'],
                            appTitles: { ['waze']: 'Waze Maps', ['google-maps']: 'Google Maps' },
                            latitude: otherUserLocation.lat,
                            longitude: otherUserLocation.lng,
                        }}
                    onBackButtonPressed={() => setVisiblePopup(false)}
                    appsWhiteList={['waze', 'google-maps',]}
                />
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
                        title={'Ubicación de Paciente'}
                        description={`Ir a ubicación del Paciente`}
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
                        title={'Su ubicación'}
                        description={`Punto de partida`}
                    >
                        <Icon
                            name='radio-outline' size={25} color={globalColors.secondary} />
                    </Marker>

                </MapView>
            </View>
        </>
    )
}
