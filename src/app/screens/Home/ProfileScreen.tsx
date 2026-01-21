import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Keyboard
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { BackBtnSvg, EmailSvg, LeftArrowSvg, PasswordSvg, Verified } from '../../assets/svgs';
import ScreenWrapper from '../../components/HomeComponents/ScreenWrapper';
import { DSButton, DSInput } from '../../components/baseComponents';
import AppColors from '../../../share/constants/AppColors';
import DSBottomSheet from '../../components/baseComponents/DSBottomSheet';
import { AuthContext } from '../../../share/features/context/AuthContext';

const ProfileScreen = ({ navigation }: any) => {
    const { logout } = useContext(AuthContext);
    const scrollViewRef = useRef<ScrollView>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState<any>({
        emailErr: '',
        passErr: ''
    });


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const sheetRef = useRef<BottomSheet>(null);

    const handleOpenModal = () => {
        sheetRef.current?.expand();
    };
    const handleLogout = () => {
        logout()
    };
    useEffect(() => {
        const hideListener = Keyboard.addListener('keyboardDidHide', () => {
            //   ScrollView?.current?.scrollToEnd({ animated: true });
        });
        return () => hideListener.remove();
    }, []);
    const HeaderContent = (
        <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()} >
                <BackBtnSvg />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>

        </View>
    );

    return (
        <>
            <ScreenWrapper headerContent={HeaderContent}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
                >
                    <ScrollView
                        ref={scrollViewRef}
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        keyboardShouldPersistTaps="handled"
                    >


                        <View style={styles.card}>

                            {/* User Info Header */}
                            <View style={styles.userInfoRow}>
                                <Image
                                     source={require('../../assets/pngs/avatar_placeholder.png')} 
                                    style={styles.avatar}
                                />
                                <View style={styles.userTextContainer}>
                                    <View style={styles.nameRow}>
                                        <Text style={styles.userName}>John Doe</Text>
                                        <View style={styles.verifiedBadge}>
                                            <Verified />
                                            <Text style={styles.verifiedText}>Verified</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.restaurantName}>The Fancy Delight</Text>
                                </View>
                            </View>

                            <View style={styles.divider} />

                            {/* Form Fields */}
                            <View style={styles.formContainer}>

                                <DSInput
                                    label=""
                                    placeholder="Email Address"
                                    iconName={<EmailSvg />}
                                    value={email}
                                    onChangeText={(text) => {
                                        setError({ ...error, emailErr: '' })
                                        setEmail(text)
                                    }}

                                    error={error.emailErr}
                                    autoCapitalize='none'
                                    editable={false}
                                />

                                <DSInput
                                    label=""
                                    placeholder="Password"
                                    iconName={<PasswordSvg />}
                                    password
                                    value={password}
                                    onChangeText={(text) => {
                                        setError({ ...error, passErr: '' })
                                        setPassword(text)
                                    }}
                                    error={error.passErr}
                                />
                                <DSInput
                                    label=""
                                    placeholder=" Confirm Password"
                                    iconName={<PasswordSvg />}
                                    password
                                    value={password}
                                    onChangeText={(text) => {
                                        setError({ ...error, passErr: '' })
                                        setPassword(text)
                                    }}


                                    error={error.passErr}
                                />


                                <DSButton
                                    label="Save Changes"
                                    variant="filled"
                                    onPress={() => console.log('Changes Saved')}

                                />
                            </View>
                        </View>

                        {/* --- Delete Account Card --- */}
                        <TouchableOpacity onPress={() => navigation.navigate('DeleteAccount')} style={styles.actionCard}>
                            <Text style={styles.actionText}>Delete Account</Text>
                            <LeftArrowSvg />

                        </TouchableOpacity>


                        <View style={styles.logoutContainer}>
                            <DSButton
                                label="Logout"
                                variant="filled"
                                onPress={handleOpenModal}

                            />
                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            </ScreenWrapper>
            <DSBottomSheet
                ref={sheetRef}
                title="Logout Confirmation"
                subtitle="Are you sure you want to Logout?"
                onConfirm={handleLogout}
            />
        </>
    );
};

const styles = StyleSheet.create({
    // --- Header Styles ---
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingTop: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: AppColors.THEME_BEIGE,
        marginLeft: 15,
    },

    // --- Layout Styles ---
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 30,
        paddingHorizontal: 15
    },

    // --- Main Card Styles ---
    card: {
        marginTop: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        // marginTop: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
    },
    userInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    userTextContainer: {
        marginLeft: 15,
        flex: 1,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F3B25', // Dark green
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EAF8E4',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#79C75D',
    },
    verifiedText: {
        color: '#5F9D43',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 4,
    },
    restaurantName: {
        fontSize: 14,
        color: '#A09578',
        marginTop: 2,
    },
    divider: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginBottom: 20,
    },

    // --- Form Styles ---
    formContainer: {
        // gap: 15, // Adds space between inputs
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EAEAEA',
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 50,
        backgroundColor: '#FFFFFF',
    },
    inputReadOnly: {
        backgroundColor: '#F5F3EB', // Beige background for read-only
        borderColor: 'transparent',
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#333',
    },

    // --- Button Overrides ---
    saveButton: {
        backgroundColor: '#8F9B8E', // The muted grey-green from image
        marginTop: 10,
        borderRadius: 25,
        height: 50,
    },

    // --- Delete Account Card ---
    actionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // Shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,
    },
    actionText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#2c2c2E',
    },

    // --- Logout ---
    logoutContainer: {
        marginTop: 'auto', // Pushes to bottom if container has height, otherwise just spacing
        paddingTop: 50,
    },
    logoutButton: {
        backgroundColor: '#1F3B25', // Deep Green
        borderRadius: 25,
        height: 55,
    }
});

export default ProfileScreen;