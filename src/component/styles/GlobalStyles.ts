import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { globalColors } from "./Color";
import { theme } from "./theme";

export const globalStyles = StyleSheet.create({
  backButtonStyle: {
    width: 24,
    height: 24,
  },
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
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
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: theme.colors.text,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },








})