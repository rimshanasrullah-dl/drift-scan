import React from 'react';
import { View,Text,  ScrollView, Platform, ImageBackground, TouchableOpacity} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '../../components/AuthComponents/PpStyles';
import { termsData } from '../../components/AuthComponents/DataFile';
import { renderTextWithBoldEmail } from '../../../share/utility/HelperFunctions';
import { BackBtnSvg } from '../../assets/svgs';
import NetworkWrapper from '../../components/baseComponents/NetworkWrapper';


const BG_MAIN = require('../../assets/pngs/BackgroundImag3.png');
const TnCScreen = ({ navigation }: any) => {
 const insets = useSafeAreaInsets();
  return (
    <View style={styles.cardContainer}>
        <NetworkWrapper>
         <ImageBackground source={BG_MAIN} style={styles.outerBackground} >
          <SafeAreaView style={styles.safeArea}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <BackBtnSvg />
          </TouchableOpacity>
      <View >
        <Text style={styles.mainTitle}>Terms & Conditions - Drift Scan</Text>
        <Text style={styles.dateText}>Effective Date: 5 Nov 2025</Text>

      </View>
      <View style={{ borderTopWidth: 1, borderTopColor: '#DDDD', marginBottom: 15 }}></View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={{flex:1}}
        keyboardShouldPersistTaps="handled" 
        nestedScrollEnabled={true}
      >
        <Text style={styles.introText}>
          Welcome to Drift Parking App! By using our app and services, you agree to these Terms and Conditions.
        </Text>

        {termsData.map((item) => (
          <View key={item.id} style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>{item.title}</Text>


            {item.content && (
              <Text style={styles.bodyText}>
                {renderTextWithBoldEmail(item.content)}
              </Text>
            )}


            {item.bullets && item.bullets.map((bullet, index) => (
              <View key={index} style={styles.bulletContainer}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bodyText}>
                  {renderTextWithBoldEmail(bullet)}
                </Text>
              </View>
            ))}


            {item.footer && (
              <Text style={[styles.bodyText, { marginTop: 10 }]}>
                {renderTextWithBoldEmail(item.footer)}
              </Text>
            )}
          </View>
        ))}

        {/* Bottom Padding */}
        <View style={{ height: 20 }} />
      </ScrollView>
      </SafeAreaView>
      </ImageBackground>
      </NetworkWrapper>
    </View>
  );
};

export default TnCScreen 