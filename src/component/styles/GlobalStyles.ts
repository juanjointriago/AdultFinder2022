import { Dimensions, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { globalColors } from "./Color";
import { theme } from "./theme";

export const ScreenSizeWidth = Dimensions.get('window').width;
export const ScreenSizeHeight = Dimensions.get('window').height;


export const globalStyles = StyleSheet.create({
  backButtonStyle: {
    width: 24,
    height: 24,
  },
  header: {
    fontSize: 18,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  circleBack: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 4,
  },
  defaultBadgeStyle: {
    bottom: 18,
    right: 2,
    position: 'absolute',
    backgroundColor: globalColors.primary
  },
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: '4%',
    paddingHorizontal: '6%'
  },
  center: {
    alignItems: 'center'
  },
  container: {
    flex: 1
  },
  titleContainer: {
    flex: 5,
  },
  title: {
    fontFamily: 'Poppins',
    color: globalColors.primary,
    fontWeight: "300",
    fontSize: 24,
    lineHeight: 22,
    paddingTop: '3%'
  },
  h2: {
    fontFamily: 'Poppins',
    color: globalColors.primary,
    fontWeight: "200",
    fontSize: 20,
    lineHeight: 24,
  },
  h3: {
    fontFamily: 'Poppins',
    color: globalColors.primary,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 0,
  },
  registerLink: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 0,
    color: globalColors.white
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: globalColors.white,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  absoluteFill: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  cardContainerGlobal: {
    flex: 1,
    paddingVertical: 14,
    height: (ScreenSizeHeight * 0.20),
    width: (ScreenSizeWidth * 0.20),
    margin: '3%',
    borderRadius: 20,
    shadowColor: globalColors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.55,
    shadowRadius: 20,
    elevation: 8,
  },
  cardTextstyle: {
    paddingTop: '5%',
    alignSelf: 'center',

    textAlign: 'center',
    fontWeight: 'bold'
  },
  cardTwoConatinerStyle: {
    position: 'relative',
    flexDirection: 'row'
    //backgroundColor: 'green',
  },
  cardContainerStyle: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: globalColors.lightBlue,
    borderRadius: 100,
    width: 65,
    height: 65,
  },
  genericContainerStyle: {
    height: ScreenSizeHeight ,
    width: ScreenSizeWidth ,
  },











})

export const mapsStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]
