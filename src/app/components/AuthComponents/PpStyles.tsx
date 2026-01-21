import { Platform, StyleSheet } from "react-native";
import AppColors from "../../../share/constants/AppColors";

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
   
  },
   outerBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
   
  },
  safeArea: {
    flex: 1,
     paddingHorizontal:20,
     marginBottom:10,
     overflow:'hidden'
  },
  header: {
  
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    paddingBottom: 10,
  },
  backButton: { marginTop:10,   
    marginBottom:20
  },
  cardContainer: {
    flex: 1,
    // marginHorizontal: 0,
    // zIndex: 1,
    // overflow: 'hidden',
  },
  scrollContent: {
    flexGrow:1,
    paddingTop: 0,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: AppColors.THEME_GREEN, 
    marginBottom: 5,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
  },
  introText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 15,
  },
  sectionContainer: {
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    marginBottom: 5,
  },
  bodyText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 19,
    flex: 1,
  },
  bulletContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 5,
    marginBottom: 3,
  },
  bulletDot: {
    fontSize: 13,
    color: '#333',
    marginRight: 8,
    lineHeight: 19,
  },
});