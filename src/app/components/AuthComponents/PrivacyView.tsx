import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import AppColors from '../../../share/constants/AppColors';
import AppFonts from '../../../share/constants/AppFonts';

const PrivacyView = () => {
    const navigation: any = useNavigation();
    return (
        < View style={[styles.termsContainer,]} >
            <TouchableOpacity 
            style={styles.borderView}
            onPress={() => navigation.navigate('TnCScreen')}
            >
                <Text style={[styles.termText,]}>Terms & Condition</Text>
            </TouchableOpacity>
            <Text style={[styles.termText, {  borderBottomWidth:0,  }]}> | </Text>

            <TouchableOpacity 
              style={styles.borderView}
            onPress={() => navigation.navigate('PrivacyPolicyScreen')}
            >
                <Text style={[styles.termText]}>Privacy Policy</Text>
            </TouchableOpacity>
        </View >
    )
}

export default PrivacyView

const styles = StyleSheet.create({
    termsContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom:Platform.OS=='android' ?20:8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        // marginTop: 30,
        // overflow:'hidden'
    },
 borderView: {
        borderBottomColor: AppColors.THEME_GREEN,
        borderBottomWidth: 1,
        // paddingBottom: 4, // <--- Add this (usually 2-5px works best)
    },
    termText: {
        fontSize: 14,

        color:AppColors.THEME_GREEN,
        fontWeight: 'bold',
        //  fontFamily:  AppFonts.Bold,
    },
    labelStyle: { fontSize: 14, color: '#173E20', fontWeight: '500', }

})