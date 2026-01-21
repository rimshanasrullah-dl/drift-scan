import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import BottomSheet, { TouchableWithoutFeedback } from '@gorhom/bottom-sheet';
import { BackBtnSvg } from '../../assets/svgs';
import ScreenWrapper from '../../components/HomeComponents/ScreenWrapper';
import { DSButton,  } from '../../components/baseComponents';
import AppColors from '../../../share/constants/AppColors';
import AppFonts from '../../../share/constants/AppFonts';
import DSBottomSheet from '../../components/baseComponents/DSBottomSheet';
import { styles } from '../../components/HomeComponents/DeleteAccComponents/DeleteAccStyles';
import HeaderContent from '../../components/HomeComponents/DeleteAccComponents/HeaderContent';

const DeleteAccount = ({ navigation }: any) => {
    const [loading, setLoading] = useState(false);
    const [delreason, setDelReason] = useState('');
    const [error, setError] = useState('');
    const sheetRef = useRef<BottomSheet>(null);
    const handleOpenModal = () => {
        sheetRef.current?.expand();
    };
    const handleDeleteAcc = () => {

    };


    return (
        <>

            <ScreenWrapper headerContent={<HeaderContent headerTitle={'Delete Account'}/>}>
                <View style={styles.scrollContent}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.card}>

                            <Text style={{ fontSize: 16, color: AppColors.THEME_GREEN, fontWeight: '500', fontFamily: AppFonts.Bold }}>Reason For Acccount Deletion</Text>

                            <View style={styles.notesContainer}>
                                <Text style={styles.notesSubHeading}>By deleting your account, you agree that all personal data will be permanently deleted or anonymized. This action cannot be reversed.</Text>
                                <View style={styles.notesView}>
                                    <TextInput
                                        style={styles.notesInput}
                                        placeholder="Add a note here..."
                                        placeholderTextColor={'#9198A6'}
                                        multiline
                                        onChangeText={(text) => {
                                            setDelReason(text)
                                            setError('')
                                        }}
                                        value={delreason}
                                        maxLength={300}
                                    />
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 5, marginHorizontal: 5, marginTop: 5 }}>
                                        <Text style={{ textAlign: 'left', color: 'red', flex: 0.95, }}>{error}</Text>
                                        <Text style={{ textAlign: 'right', color: '#666', fontFamily: AppFonts.Regular }}>{delreason.length}/300</Text>

                                    </View>
                                </View>
                            </View>

                            <View style={{ marginTop: 15 }}>
                                <DSButton
                                    label="Delete Account"
                                    variant="filled"
                                    style={{ backgroundColor: '#9D190E' }}
                                    onPress={handleOpenModal}

                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </ScreenWrapper>

            <DSBottomSheet
                ref={sheetRef}
                title="Account Deletion"
                subtitle="Are you sure you want to permanently delete your Account?"
                onConfirm={handleDeleteAcc}
            />
        </>
    );
};



export default DeleteAccount;