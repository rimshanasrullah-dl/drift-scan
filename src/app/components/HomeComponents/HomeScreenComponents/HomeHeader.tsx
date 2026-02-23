import React from 'react';
import { View, Text, Image, ViewStyle, TouchableOpacity } from 'react-native';
import { Logo } from '../../../assets/svgs';
import { styles } from './HomeScreenstyles';
import { useUser } from '../../../../share/features/context/UserContext';

interface HomeHeaderProps {
  userName?: string;
  tagline?: string;
  userImage?: any;
  containerStyle?: ViewStyle;
  onPressFun?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ onPressFun }) => {
  const { userDetail, loading }: any = useUser();

  return (

    <TouchableOpacity onPress={onPressFun} style={styles.headerRow}>
      <View style={styles.leftSection}>
        <Image
          source={userDetail?.image_path ? { uri: userDetail.image_path } : require('../../../assets/pngs/profileAvatar.png')}
          style={styles.avatar} resizeMode='cover'
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{loading ? 'loading....' : userDetail?.name}</Text>
          <Text style={styles.tagline}>{userDetail?.restaurant_name}</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Logo />
      </View>

    </TouchableOpacity>

  );
};



export default HomeHeader;