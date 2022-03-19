import { StyleSheet } from "react-native";
import { globalColors } from "./Color";

export const globalStyles = StyleSheet.create({
  backButtonStyle: {
    zIndex: 999,
    elevation: 9,
    textAlign: "center",
  },
  circleBack: {
    backgroundColor: globalColors.light,
    width: 40,
    height: 40,
    borderRadius: 7.217919826507568,
    elevation: 20,
    justifyContent: "center",
    shadowOpacity: 0.3,
    shadowRadius: 5,
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
  }








})