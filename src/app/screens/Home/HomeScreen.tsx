import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Alert,
  Linking,
  Platform,
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
import { api } from '../../../share/core/api';
import Toast from 'react-native-toast-message';

const HomeScreen = ({ navigation }: any) => {
  const { hasPermission, requestPermission } = useCameraPermission();

  const [loading, setLoading] = useState(true);
  const [rsloading, setRSLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<ActivityItem[]>([]);
  const sheetRef = useRef<BottomSheet>(null);
  const [selectedItem, setSelectedItem] = useState<ActivityItem | null>(null);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);


  const fetchHomeData = async () => {
    try {

      const res: any = await api.post("/parking/recent-activities", { requiresAuth: true });

      setData(res?.content?.recent_activities)
      console.log("recent res==", res)
      return res
    } catch (err: any) {
      console.log("recent actvity Catch err==", err)
      setData([])
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }


  const releaseSlot = async (id?: any,) => {
    setRSLoading(true)
    const payload={
        "order_id": id,
    }
    try {

      const res: any = await api.post("/parking/release-slot",payload, { requiresAuth: true });
      fetchHomeData()
      console.log("releaseSlot res==", res)
      return res
    } catch (err: any) {
      console.log("releaseSlot actvity Catch err==", err)
        Toast.show({
              type: 'error',
              text1: err.message,
            });
    } finally {
      setRSLoading(false)
    }
  }


  useEffect(() => {
    fetchHomeData()
  }, []);

  useEffect(() => {
    if (hasPermission && permissionModalVisible) {
      setPermissionModalVisible(false)
    }
  }, [hasPermission])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchHomeData()
  }, []);


  const handleOpenReleaseModal = (item: ActivityItem) => {
    setSelectedItem(item);
    sheetRef.current?.expand();
  };

  const handleConfirmRelease = () => {
    if (selectedItem) {
      console.log(`Releasing slot for Order ID: ${selectedItem?.order_id}`);
      releaseSlot(selectedItem?.order_id)
    }
    sheetRef.current?.close();
  };


  const scanPress = () => {
    let permissionResult: any

    if (!hasPermission) {
      permissionResult = requestPermission()
    }

    if (permissionResult?.granted || permissionResult?.status === 'granted' || permissionResult == true || hasPermission) {
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

          <SafeAreaView style={{ marginTop: Platform.OS == 'ios' ? -35 : 0, flex: 1, }}>
            {RenderHeader()}
            {loading ? (
              <ActivitySkeleton />
            ) : (

              <FlatList
                data={data}
                keyExtractor={(item: any) => item?.order_id}
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
        confirmText="Yes, Release"
        cancelText="Cancel"
        onConfirm={handleConfirmRelease}
        isLoading={rsloading}
      />
      <PermissionModal
        visible={permissionModalVisible}
        onOpenSettings={() => {
          Linking.openSettings()
          setPermissionModalVisible(false)
        }}
        onDeny={() => setPermissionModalVisible(false)}
      />
    </>
  );
};



export default HomeScreen;