import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './HomeScreenstyles';
import { ActivityClock } from '../../../assets/svgs';


 const RenderHeader = () => (
    <View style={styles.listHeaderContainer}>

      <View style={styles.sectionTitleRow}>
        <ActivityClock />

        <Text style={styles.sectionTitle}>Recent Activity</Text>
      </View>
      <View style={styles.divider} />
    </View>
  );

export default RenderHeader