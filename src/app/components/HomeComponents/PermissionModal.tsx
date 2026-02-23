import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import AppColors from '../../../share/constants/AppColors';
import AppFonts from '../../../share/constants/AppFonts';

interface PermissionModalProps {
  visible: boolean;
  onOpenSettings: () => void;
  onDeny: () => void;
  onAllow?: () => void;
}

export const PermissionModal = ({
  visible,
  onOpenSettings,
  onDeny,
  onAllow,
}: PermissionModalProps) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={onDeny}
    >
      <TouchableWithoutFeedback style={{ flex: 1, }} onPress={onDeny}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Camera Access</Text>
            <Text style={styles.message}>
              Drift Scan likes to access your camera to scan QR codes for parking allocation.
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.denyButton]}
                onPress={onDeny}
              >
                <Text style={styles.denyText}>Don't Allow</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.allowButton]}
                onPress={onAllow || onOpenSettings}
              >
                <Text style={styles.allowText}>Allow</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red',
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: Dimensions.get('window').width * 0.85,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontFamily: AppFonts.Bold,
    marginBottom: 12,
    color: '#000',
  },
  message: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
    color: '#444',
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  denyButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  allowButton: {
    backgroundColor: AppColors.THEME_GREEN
  },
  denyText: {
    color: '#333',
    fontFamily: AppFonts.SemiBold,
  },
  allowText: {
    color: 'white',
    fontFamily: AppFonts.SemiBold,
  },
});