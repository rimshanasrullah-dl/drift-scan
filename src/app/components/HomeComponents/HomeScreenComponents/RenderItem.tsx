// RenderItem.tsx
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import AppColors from '../../../../share/constants/AppColors';
import { styles } from './HomeScreenstyles';
import { Entered, Exit, ReleaseSlotSvg } from '../../../assets/svgs';

export interface ActivityItem {
  id: string;
  name: string;
  orderId: string;
  date: string;
  time: string;
  status: 'Entered' | 'Exited';
}

// 1. Add onPressRelease to props
interface RenderItemProps {
  item: ActivityItem;
  onPressRelease: (item: ActivityItem) => void; 
}

const RenderItem = ({ item, onPressRelease }: RenderItemProps) => {
    const isEntered = item.status === 'Entered';
    const badgeColor = isEntered ? AppColors.THEME_GREEN : AppColors.THEME_BEIGE;

    return (
      <View style={styles.card}>
        <View style={styles.cardTopRow}>
          <View style={[styles.iconCircle, { backgroundColor: isEntered ? '#F2EFDC' : '#E8ECE9' }]}>
            {isEntered ? <Entered /> : <Exit />}
          </View>

          <View style={styles.cardDetails}>
            <View style={styles.nameRow}>
              <Text numberOfLines={2} style={styles.cardName}>{item.name}</Text>
              <View style={[styles.statusBadge, { backgroundColor: badgeColor }]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
            <View style={styles.nameRow}>
              <Text numberOfLines={2} style={styles.orderId}>{item.orderId}</Text>
              <Text style={styles.dateTime}>{item.date} - {item.time}</Text>
            </View>
          </View>
        </View>

        {isEntered && (
          <>
            <View style={{ height: 1, backgroundColor: '#E0E1E4', marginTop: 12, opacity: 0.8 }} />
            
            {/* 2. Call the prop function on press */}
            <TouchableOpacity 
                style={styles.releaseButton}
                onPress={() => onPressRelease(item)} 
            >
              <ReleaseSlotSvg />
              <Text style={styles.releaseText}>Release Slot</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
};

export default RenderItem;