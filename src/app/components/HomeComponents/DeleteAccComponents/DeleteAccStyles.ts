import { StyleSheet } from "react-native";
import AppColors from "../../../../share/constants/AppColors";
import AppFonts from "../../../../share/constants/AppFonts";

export const styles = StyleSheet.create({
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
        flex: 1,
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
    },
    notesContainer: {
        paddingTop: 10,
        // marginBottom: 20,
    },
    notesHeading: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c2c2c',
        paddingHorizontal: 10
        // marginBottom: 10,
    },
    notesSubHeading: {
        fontSize: 13,
        // fontWeight: '500',
        color: '#2C2C2E',
        marginBottom: 20,
        fontFamily: AppFonts.Regular
    },
    notesView: {
        // shadowColor: 'red',
        //     shadowOffset: { width: 0, height: 1 },
        //     shadowOpacity: 0.1,
        //     shadowRadius: 5,
        //     elevation: 2,
        // borderWidth:1
    },
    notesInput: {
        height: 100,
        borderColor: '#E0E1E4',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        fontSize: 14,
        textAlignVertical: 'top',
        fontFamily: AppFonts.Regular


    },

});