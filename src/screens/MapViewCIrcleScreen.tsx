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
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';



export const MapViewCIrcleScreen = () => {

  const [perimeterLocation, setPerimeterLocation] = useState<coords>({
    lat: -0,
    lng: -0
  })
  //get Perimeter Location from firebase
  const getPerimeterCoords = async () => {
    const docnRef = doc(db, 'perimeter', 'perimeter');
    const docSnap = await getDoc(docnRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
      setPerimeterLocation({
        lat: docSnap.data().lat,
        lng: docSnap.data().lng,
      })
      setRegion({
        latitude: docSnap.data().lat,
        longitude: docSnap.data().lng,
        latitudeDelta: deltaCoords.lat,
        longitudeDelta: deltaCoords.lng,
      })
    } else {
      console.warn('problema al obtener coordenadas de la base de datos en el perimetro');
    }
  }

  //circle
  const [location, setLocation] = useState<coords>({
    lat: -0,
    lng: -0
  });
  const getAndsetCords = async () => {
    const deviceLocationFromDBRef = doc(db, 'users', 'HP1mRnUOSGQUCcVrqJkg');
    const dlfDBSnap = await getDoc(deviceLocationFromDBRef);
    if(dlfDBSnap.exists()){
      console.log(dlfDBSnap);
      setLocation({
        lat: dlfDBSnap.data().currentLat,
        lng: dlfDBSnap.data().currentLng
      })
    }
  }
  const [visiblePopup, setVisiblePopup] = useState(false)
  const [region, setRegion] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: deltaCoords.lat,
    longitudeDelta: deltaCoords.lng,
  })
  const setCordsOnFirebase = async ({ lat, lng }: coords) => {
    const q = doc(db, 'users', 'HP1mRnUOSGQUCcVrqJkg');
    await updateDoc(q, {
      currentLat: lat,
      currentLng: lng,
    });

  }
  const getcurrentLoc = async () => {
    await Geolocation.getCurrentPosition((position) => {
      const currentLocation: coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      getPerimeterCoords();
      setLocation(currentLocation)
      setCordsOnFirebase(currentLocation);
      getAndsetCords();
      //print
      console.log(JSON.stringify(currentLocation));
    },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
  }


  useEffect(() => {
    getcurrentLoc();
  }, []);
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
            key={perimeterLocation.lat + perimeterLocation.lng}
            center={{
              latitude: perimeterLocation.lat,
              longitude: perimeterLocation.lng
            }}
            radius={75}
            strokeWidth={1}
            strokeColor={'#1a66ff'}
            fillColor={'rgba(230,238,255,0.5)'}
          />
          <Marker
            coordinate={
              {
                latitude: perimeterLocation.lat,
                longitude: perimeterLocation.lng
              }}
            title={'Ubicación de Asilo'}
            description={`Ir a ubicación del Asilo`}
            onCalloutPress={
              () => setVisiblePopup(true)
            }
          >
            <Icon
              name='home-outline' size={25} color={globalColors.secondary} />
          </Marker>
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
              name='person-outline' size={25} color={globalColors.primary} />
          </Marker>
        </MapView>
      </View>
    </>
  )
}
