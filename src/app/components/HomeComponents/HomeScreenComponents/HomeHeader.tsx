import React from 'react';
import { View, Text, StyleSheet, Image, ViewStyle, TouchableOpacity } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from '../../../assets/svgs';
import AppFonts from '../../../../share/constants/AppFonts';
import AppColors from '../../../../share/constants/AppColors';
import { styles } from './HomeScreenstyles';

interface HomeHeaderProps {
  userName?: string;
  tagline?: string;
  userImage?: any; 
  containerStyle?: ViewStyle;
  onPressFun?: ()=>void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ 
  userName, 
  tagline, 
  userImage, 
  containerStyle ,
  onPressFun
}) => {
  return (
    <TouchableOpacity onPress={onPressFun} style={[styles.container, containerStyle]}>
          <View style={styles.leftSection}>
        <Image source={require('../../../assets/pngs/avatar_placeholder.png')} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{'John Doe'}</Text>
          <Text style={styles.tagline}>{'The Fancy Delight'}</Text>
        </View>
      </View>
      
      <View style={styles.rightSection}>
        <Logo /> 
      </View>
    </TouchableOpacity>
  
  );
};



export default HomeHeader;