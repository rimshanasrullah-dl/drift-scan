import React from 'react';
import { View, Text,} from 'react-native';
import ScreenWrapper from '../../components/HomeComponents/ScreenWrapper';
import { DSButton } from '../../components/baseComponents';
import { ValidIllustration } from '../../assets/svgs';
import { styles } from '../../components/HomeComponents/SlotDetailsComponents/SlotDetailScreenStyles';
import DetailRow from '../../components/HomeComponents/SlotDetailsComponents/DetailRow';
import HeaderContent from '../../components/HomeComponents/DeleteAccComponents/HeaderContent';
import { useUser } from '../../../share/features/context/UserContext';


const SlotDetailScreen = ({ navigation, route }: any) => {
    const params=route?.params?.data
   const { userDetail ,loading}: any = useUser();
 
    return (
        <ScreenWrapper  headerContent={<HeaderContent headerTitle={loading ? 'loading....' :userDetail?.restaurant_name}  showBackButton={false}/>}>
            <View style={styles.scrollContent} >
                
                <View style={styles.statusCard}>
                   
                    <ValidIllustration />
                    <View style={styles.statusTextContainer}>
                        <Text style={styles.statusTitle}>Valid QR Code</Text>
                        <Text style={styles.statusSubtitle}>Parking Allocated Successfully</Text>
                    </View>
                </View>

                
                <View style={styles.detailsCard}>
                    <DetailRow label="Order No." value={params?.order_no} />
                    <DetailRow label="Customer Name"  value={params?.customer_name}  />
                    <DetailRow label="Restaurant Name"  value={params?.restaurant_name}  />
                    <DetailRow label="Scanned At"  value={params?.scanned_at}  />
                </View>

               
                <View style={styles.buttonContainer}>

                    
                    <DSButton
                        label="Scan Another Code"
                        variant="filled"
                        onPress={() => navigation.navigate("ScanScreen")} 
                    />

                   
                    <DSButton
                        label="Back to Home"
                        variant="outlined" 
                        onPress={() => navigation.navigate("Home")} 


                    />

                </View>

            </View>
        </ScreenWrapper>
    );
};



export default SlotDetailScreen