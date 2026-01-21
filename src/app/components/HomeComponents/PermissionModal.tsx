import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import AppColors from '../../../share/constants/AppColors';

interface PermissionModalProps {
  visible: boolean;
  onOpenSettings: () => void;
  onDeny: () => void;
}

export const PermissionModal = ({
  visible,
  onOpenSettings,
  onDeny
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
            <Text style={styles.title}>Camera Permission Needed</Text>
            <Text style={styles.message}>
              Drift Scan needs camera access to scan QR codes. Please enable it in your phone settings
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.denyButton]}
                onPress={onDeny}
              >
                <Text style={styles.denyText}>Don't Use</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.allowButton]}
                onPress={onOpenSettings}
              >
                <Text style={styles.allowText}>Go to Settings</Text>
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
    fontWeight: 'bold',
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
    fontWeight: '600',
  },
  allowText: {
    color: 'white',
    fontWeight: '600',
  },
});