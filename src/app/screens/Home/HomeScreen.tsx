import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet from '@gorhom/bottom-sheet';
import DSButton from '../../components/baseComponents/DSButton';
import AppColors from '../../../share/constants/AppColors';
import ActivitySkeleton from '../../components/HomeComponents/HomeScreenComponents/ActivitySkeleton';
import { QrScanSvg } from '../../assets/svgs';
import { styles } from '../../components/HomeComponents/HomeScreenComponents/HomeScreenstyles';
import ScreenWrapper from '../../components/HomeComponents/ScreenWrapper';
import HomeHeader from '../../components/HomeComponents/HomeScreenComponents/HomeHeader';
import RenderHeader from '../../components/HomeComponents/HomeScreenComponents/RenderHeader';
import RenderItem, { ActivityItem } from '../../components/HomeComponents/HomeScreenComponents/RenderItem';
import RenderEmptyComponent from '../../components/HomeComponents/HomeScreenComponents/RenderEmptyComponent';
import DSBottomSheet from '../../components/baseComponents/DSBottomSheet';
import { useCameraPermission } from 'react-native-vision-camera';
import { PermissionModal } from '../../components/HomeComponents/PermissionModal';

const HomeScreen = ({ navigation }: any) => {
  const { hasPermission, requestPermission } = useCameraPermission();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<ActivityItem[]>([]);
  const sheetRef = useRef<BottomSheet>(null);
  const [selectedItem, setSelectedItem] = useState<ActivityItem | null>(null);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);


  const fetchData = () => {
    const mockData: ActivityItem[] = [
      { id: '1', name: 'John Doe', orderId: '#ORD-20251009-1', date: '11 Nov 2025', time: '21:00', status: 'Entered' },
      { id: '2', name: 'Emma Smith', orderId: '#ORD-20251010-1', date: '10 Nov 2025', time: '22:00', status: 'Exited' },
      { id: '3', name: 'Robert David', orderId: '#ORD-20251122-6', date: '09 Nov 2025', time: '22:30', status: 'Entered' },
      { id: '4', name: 'Jameel Ahmed', orderId: '#ORD-20256846-1', date: '09 Nov 2025', time: '24:00', status: 'Entered' },
      { id: '5', name: 'Sarah Joseph', orderId: '#ORD-20252088-2', date: '08 Nov 2025', time: '18:40', status: 'Exited' },
    ];

    setData(mockData);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    setTimeout(() => fetchData(), 2000);
  }, []);

  useEffect(() => {
    if (hasPermission && permissionModalVisible) {
      setPermissionModalVisible(false)
    }
  }, [hasPermission])
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => fetchData(), 1500);
  }, []);


  const handleOpenReleaseModal = (item: ActivityItem) => {
    setSelectedItem(item);
    sheetRef.current?.expand();
  };

  const handleConfirmRelease = () => {
    if (selectedItem) {
      console.log(`Releasing slot for Order ID: ${selectedItem.orderId}`);
      // TODO: Add your API call here
    }
    sheetRef.current?.close();
  };


  const scanPress = async () => {
    
    const permissionResult: any = await requestPermission();


    if (permissionResult.granted || permissionResult.status === 'granted'||permissionResult == true||hasPermission) {
      navigation.navigate("ScanScreen");
      return;
    }
    if (!hasPermission && (!permissionResult.granted || permissionResult.status !== 'granted' || permissionResult == false))
      setPermissionModalVisible(true)
  };

  return (
    <>
      <ScreenWrapper headerContent={<HomeHeader onPressFun={() => navigation.navigate("ProfileScreen")} />}>


        <DSButton
          label="Start Scanning QR Code"
          variant="filled"
          onPress={scanPress}
          icon={<QrScanSvg />}
          style={styles.scanButton}
        />

        <View style={styles.sheetView}>

          <SafeAreaView style={{ marginTop: -15, flex: 1 }}>
            {RenderHeader()}
            {loading ? (
              <ActivitySkeleton />
            ) : (

              <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <RenderItem
                    item={item}
                    onPressRelease={handleOpenReleaseModal}
                  />
                )}
                ListEmptyComponent={RenderEmptyComponent}
                contentContainerStyle={{ paddingBottom: 100, paddingTop: 2 }}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor={AppColors.THEME_GREEN}
                    colors={[AppColors.THEME_GREEN]}
                  />
                }
              />


            )}

          </SafeAreaView>

        </View>
      </ScreenWrapper>
      <DSBottomSheet
        ref={sheetRef}
        title="Release Slot Confirmation"
        subtitle="Are you sure you want to release this slot?"
        // subtitle={selectedItem 
        //    ? `Are you sure you want to release the slot for ${selectedItem.name}?` 
        //    : "Are you sure you want to release this slot?"
        // }
        confirmText="Yes, Release"
        cancelText="Cancel"
        onConfirm={handleConfirmRelease}
      />
      <PermissionModal
        visible={permissionModalVisible}
        onOpenSettings={() => Linking.openSettings()}
        onDeny={() => setPermissionModalVisible(false)}
      />
    </>
  );
};



export default HomeScreen;