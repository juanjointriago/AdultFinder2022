import React, { useEffect, useState } from 'react';
import MapView, { Region, PROVIDER_DEFAULT, Marker, Circle } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { View } from 'react-native';
import { Popup } from 'react-native-map-link';
import { globalStyles, mapsStyle } from '../component/styles/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalColors } from '../component/styles/Color';
import { BackButton } from '../component/buttons/BackButton';
import { coords, deltaCoords } from '../component/interfaces/UIInterfaces';
import { Text } from 'react-native-paper';
import { db } from '../firebase/firebase-config';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';



export const MapViewCIrcleScreen = () => {

  const [location, setLocation] = useState<coords>({
    lat: 0,
    lng: 0
  });
  const getAndsetCords = async () => {
    const collectionRef = collection(db, 'users');
    const q = query(collectionRef, where("email", '==', 'juanintriagovillarrealdev@gmail.com'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setLocation({
        lat: doc.data().currentLat,
        lng: doc.data().currentLng
      })
      console.log(doc.data());
    })
  }
  const [visiblePopup, setVisiblePopup] = useState(false)
  const [region, setRegion] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: deltaCoords.lat,
    longitudeDelta: deltaCoords.lng,
  })
  const setCordsOnFirebase = async ({ lat, lng }: any) => {
    const q = doc(db, 'users', 'HP1mRnUOSGQUCcVrqJkg');
    await updateDoc(q, {
      currentLat: lat,
      currentLng: lng,
    });

  }
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
      setCordsOnFirebase(currentLocation);
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
    getAndsetCords();
  }, [])
  return (
    <>
      <View style={[globalStyles.genericContainerStyle, { backgroundColor: globalColors.lightYellow }]}>
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
              dialogTitle: 'Navegar al paciente 🚗',
              cancelText: 'Cancelar',
              appsWhiteList: ['waze', 'google-maps'],
              appTitles: { ['waze']: 'Waze Maps', ['google-maps']: 'Google Maps' },
              latitude: location.lat,
              longitude: location.lng,
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
          }}> Ubicación del paciente</Text>

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
            fontSize: 12,
            color: globalColors.white,
            textAlignVertical: 'center'
          }}> Si la ubicación no se actualiza por algun problema de conectividad a redes eficientes, presione el boton hacia atrás e ingrese a esta pantalla nuevamente
          </Text>
        </View>
        <MapView
          zoomEnabled
          scrollDuringRotateOrZoomEnabled
          customMapStyle={mapsStyle}
          style={{
            alignSelf: 'center',
            top: '5%',
            height: '70%',
            width: '90%',
            borderColor: globalColors.black,
            borderStyle: 'solid'
          }}

          provider={PROVIDER_DEFAULT}
          region={region}
        >
          <Circle
            key={location.lat + location.lng}
            center={{
              latitude: location.lat,
              longitude: location.lng
            }}
            radius={75}
            strokeWidth={1}
            strokeColor={'#1a66ff'}
            fillColor={'rgba(230,238,255,0.5)'}
          />
          <Marker
            coordinate={
              {
                latitude: location.lat,
                longitude: location.lng
              }}
            title={'Ubicación de Paciente'}
            description={`Ir a ubicación del Paciente`}
            onCalloutPress={
              () => setVisiblePopup(true)
            }
          >
            <Icon
              name='walk-outline' size={25} color={globalColors.primary} />
          </Marker>
        </MapView>
      </View>
    </>
  )
}
