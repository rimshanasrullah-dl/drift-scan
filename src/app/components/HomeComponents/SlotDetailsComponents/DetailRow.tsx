import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from './SlotDetailScreenStyles';

const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.rowContainer}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
    </View>
);


export default DetailRow
