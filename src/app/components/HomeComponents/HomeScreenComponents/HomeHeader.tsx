import React from 'react';
import { View, Text, StyleSheet, Image, ViewStyle, TouchableOpacity } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { BackBtnSvg, Logo } from '../../../assets/svgs';
import AppFonts from '../../../../share/constants/AppFonts';
import AppColors from '../../../../share/constants/AppColors';
import { styles } from './HomeScreenstyles';
import { useUser } from '../../../../share/features/context/UserContext';

interface HomeHeaderProps {
  userName?: string;
  tagline?: string;
  userImage?: any;
  containerStyle?: ViewStyle;
  onPressFun?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  userName,
  tagline,
  userImage,
  containerStyle,
  onPressFun
}) => {
  const { userDetail ,loading}: any = useUser();
  return (
 
     <TouchableOpacity onPress={onPressFun}  style={styles.headerRow}>
       <View style={styles.leftSection}>
           <Image source={{ uri: userDetail?.image_path }} style={styles.avatar} resizeMode='cover' />
           <View style={styles.textContainer}>
          <Text style={styles.name}>{loading ? 'loading....' :userDetail?.name }</Text>
          <Text style={styles.tagline}>{userDetail?.restaurant_name }</Text>
        </View>
       </View>
   
       <View style={styles.rightSection}>
        <Logo />
      </View>

    </TouchableOpacity>

  );
};



export default HomeHeader;