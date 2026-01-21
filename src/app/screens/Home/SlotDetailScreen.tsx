import React from 'react';
import { View, Text,} from 'react-native';
import ScreenWrapper from '../../components/HomeComponents/ScreenWrapper';
import { DSButton } from '../../components/baseComponents';
import { ValidIllustration } from '../../assets/svgs';
import { styles } from '../../components/HomeComponents/SlotDetailsComponents/SlotDetailScreenStyles';
import DetailRow from '../../components/HomeComponents/SlotDetailsComponents/DetailRow';
import HeaderContent from '../../components/HomeComponents/DeleteAccComponents/HeaderContent';


const SlotDetailScreen = ({ navigation }: any) => {
  
 
    return (
        <ScreenWrapper  headerContent={<HeaderContent headerTitle={'The Fancy Delight'} showBackButton={false}/>}>
            <View style={styles.scrollContent} >
                
                <View style={styles.statusCard}>
                   
                    <ValidIllustration />
                    <View style={styles.statusTextContainer}>
                        <Text style={styles.statusTitle}>Valid QR Code</Text>
                        <Text style={styles.statusSubtitle}>Parking Allocated Successfully</Text>
                    </View>
                </View>

                
                <View style={styles.detailsCard}>
                    <DetailRow label="Order No." value="#ORD-20251009-1" />
                    <DetailRow label="Customer Name" value="John Doe" />
                    <DetailRow label="Restaurant Name" value="The Fancy Delight" />
                    <DetailRow label="Scanned At" value="16:24" />
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