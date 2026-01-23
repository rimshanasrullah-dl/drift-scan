import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from './DeleteAccStyles'
import { BackBtnSvg } from '../../../assets/svgs'
import { useNavigation } from '@react-navigation/native'

interface HeaderProps {
  headerTitle?: string;
  showBackButton?: boolean;
  // Optional: Allow passing a custom icon
  backIcon?: React.ReactNode;
}
const HeaderContent: React.FC<HeaderProps> = ({
  headerTitle = '',
  showBackButton = true,

}) => {
  const navigation = useNavigation()
  return (
    <View style={styles.headerRow}>
      {showBackButton ? <TouchableOpacity onPress={() => navigation.goBack()} >
        <BackBtnSvg />
      </TouchableOpacity> : <></>}
      <Text style={styles.headerTitle}>{headerTitle}</Text>

    </View>
  )
}

export default HeaderContent