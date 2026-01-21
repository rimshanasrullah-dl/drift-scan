import { StyleSheet } from "react-native";
import AppColors from "../../../../share/constants/AppColors";
import AppFonts from "../../../../share/constants/AppFonts";

export const styles = StyleSheet.create({
  
    headerContent: {
        paddingVertical: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: AppColors.THEME_BEIGE,
        fontFamily:AppFonts.Bold
    },

    scrollContent: {
        flex:1,
        paddingBottom: 30,
        paddingTop: 10,
        paddingHorizontal: 15
    },

   
    statusCard: {
          marginTop: 30,
        backgroundColor: '#F5F3EB', 
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 20,
        borderWidth:1,
        borderColor:'#ddd'
    },

    statusTextContainer: {
        flex: 1,
    },
    statusTitle: {
        fontSize: 18,
        fontWeight: '500',
        color:AppColors.THEME_GREEN,
        marginBottom: 4,
        fontFamily: AppFonts.SemiBold
    },
    statusSubtitle: {
        fontSize: 14,
        color: '#2C2C2E',
        marginTop: 5,
         fontFamily: AppFonts.Regular
    },

  
    detailsCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 30,
       
        marginHorizontal: 4, 
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    rowLabel: {
        fontSize: 14,
        color: '#2c2c2e',
        opacity: 0.7,
        fontFamily:AppFonts.Regular
    },
    rowValue: {
        fontSize: 14,
        color: '#2c2c2e',
        fontWeight: '500',
        fontFamily:AppFonts.Regular
    },

   
    buttonContainer: {
        gap: 5,
    },
   
});