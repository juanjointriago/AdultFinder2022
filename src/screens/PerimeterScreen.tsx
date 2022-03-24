import React, { useEffect, useLayoutEffect, useState } from 'react';
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
import { doc, getDoc } from 'firebase/firestore';



export const PerimeterScreen = () => {

  const [perimeterLocation, setPerimeterLocation] = useState<coords>({
    lat: -0,
    lng: -0
  })

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

  const [visiblePopup, setVisiblePopup] = useState(false)
  const [region, setRegion] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: deltaCoords.lat,
    longitudeDelta: deltaCoords.lng,
  })

  useEffect(() => {
    getPerimeterCoords();
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
              latitude: perimeterLocation.lat,
              longitude: perimeterLocation.lng,
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
          }}> Perímetro establecido</Text>

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
          }}> Aqui se encuentra el perimetro establecido en el asilo de ancianos San vicente de Paúl
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
            title={'Ubicación de Paciente'}
            description={`Ir a ubicación del Paciente`}
            onCalloutPress={
              () => setVisiblePopup(true)
            }
          >
            <Icon
              name='home-outline' size={25} color={globalColors.primary} />
          </Marker>
        </MapView>
      </View>
    </>
  )
}
