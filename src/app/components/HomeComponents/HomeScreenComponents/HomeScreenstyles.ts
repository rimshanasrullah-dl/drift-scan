import { StyleSheet } from "react-native";
import AppFonts from "../../../../share/constants/AppFonts";
import AppColors from "../../../../share/constants/AppColors";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  listHeaderContainer: {
    paddingHorizontal: 20,

  },
  scanButton: {
    marginVertical: 15,
    marginHorizontal: 15

  },
  sheetView: {

    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40, borderTopRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    elevation: 5,


  },
  sectionTitleRow: {
    flexDirection: 'row',
    // alignItems: 'center',

    gap: 10
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: AppFonts.Bold,
    color: '#1E3C2F',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },

  // Card Styles
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 20,
    padding: 15,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 2
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#F3F4F0', // Very light grey/green
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#E8ECEF',
  },
  cardDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    gap: 4
  },
  cardName: {
    fontSize: 16,
    fontFamily: AppFonts.Bold,
    color: '#333',
    fontWeight: '600',
    flex: 2
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,

  },
  statusText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  orderId: {
    fontSize: 13,
    color: '#666',
    fontFamily: AppFonts.Regular,
    marginBottom: 2,
    flex: 1
  },
  dateTime: {
    fontSize: 12,
    color: '#999',
    fontFamily: AppFonts.Regular,
    flex: 1,
    textAlign: 'right'
    //  alignSelf:'flex-end'
  },

  // Release Button
  releaseButton: {
    marginTop: 15,
    backgroundColor: '#F6F3EC', // Light beige
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFE8D8',
    alignSelf: 'center',
    width: '60%',
    gap: 8
  },
  releaseText: {
    color: AppColors.THEME_GREEN,
    fontSize: 14,
    fontWeight: '600',
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: AppColors.THEME_BEIGE,
    fontFamily: AppFonts.Bold,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    // height:'100%',
    backgroundColor: 'red',
    // paddingVertical: 15,

  },
  leftSection: {
    flexDirection: 'row',
    // alignItems: 'center',
    flex: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: '#fff'
  },
  textContainer: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontFamily: AppFonts.Bold,
    color: AppColors.THEME_GREEN,
    fontWeight: '600',

  },
  tagline: {
    fontSize: 14,
    fontFamily: AppFonts.Regular,
    color: AppColors.THEME_BEIGE,
    marginTop: 5
  },
  rightSection: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flex: 1
  },
  headerRow: {
    flexDirection: 'row',
    // alignItems: 'center',
    width: '100%',
    marginTop: 20,

  },
});