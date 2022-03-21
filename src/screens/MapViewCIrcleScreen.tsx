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



export const MapViewCIrcleScreen = () => {
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
          }}> Ubicación del paciente</Text>
          
        </View>
        <View  style={{
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
            radius={3800}
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
