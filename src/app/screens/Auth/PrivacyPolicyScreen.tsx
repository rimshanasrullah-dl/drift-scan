import React from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, } from 'react-native';
import { styles } from '../../components/AuthComponents/PpStyles';
import { privacyData } from '../../components/AuthComponents/DataFile';
import { renderTextWithBoldEmail } from '../../../share/utility/HelperFunctions';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackBtnSvg } from '../../assets/svgs';
import NetworkWrapper from '../../components/baseComponents/NetworkWrapper';


const BG_MAIN = require('../../assets/pngs/BackgroundImag3.png');
const PrivacyPolicyScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.cardContainer}>
      <NetworkWrapper>
      <ImageBackground source={BG_MAIN} style={styles.outerBackground} >
        <SafeAreaView style={[styles.safeArea,{ }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <BackBtnSvg />
          </TouchableOpacity>
          <View >
            <Text style={styles.mainTitle}>Privacy Policy - Drift Scan</Text>
            <Text style={styles.dateText}>Effective Date: 5 Nov 2025</Text>

          </View>
          <View style={{ borderTopWidth: 1, borderTopColor: '#DDDD', marginBottom: 15 }}></View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
          >
            <Text style={styles.introText}>
              Drift Parking App respects your privacy. This policy explains how we collect, use, and protect your information.
            </Text>

            {privacyData.map((item) => (
              <View key={item.id} style={styles.sectionContainer}>
                <Text style={styles.sectionHeader}>{item.title}</Text>

                {/* Updated Content Rendering */}
                {item.content && (
                  <Text style={styles.bodyText}>
                    {renderTextWithBoldEmail(item.content)}
                  </Text>
                )}

                {/* Updated Bullet Rendering */}
                {item.bullets && item.bullets.map((bullet, index) => (
                  <View key={index} style={styles.bulletContainer}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bodyText}>
                      {renderTextWithBoldEmail(bullet)}
                    </Text>
                  </View>
                ))}

                {/* Updated Footer Rendering */}
                {item.footer && (
                  <Text style={[styles.bodyText, { marginTop: 10 }]}>
                    {renderTextWithBoldEmail(item.footer)}
                  </Text>
                )}
              </View>
            ))}

            {/* Bottom Padding */}
            <View style={{ height: 40 }} />
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
      </NetworkWrapper>
    </View>

  );
};

export default PrivacyPolicyScreen