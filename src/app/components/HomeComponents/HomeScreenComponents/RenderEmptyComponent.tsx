import { View, Text } from 'react-native'
import React from 'react'
import { NoActivitySvg } from '../../../assets/svgs';
import { styles } from './HomeScreenstyles';


 const RenderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <NoActivitySvg width={220} height={220} />
      <Text style={styles.emptyText}>No Activity Yet!</Text>
    </View>
  );

export default RenderEmptyComponent