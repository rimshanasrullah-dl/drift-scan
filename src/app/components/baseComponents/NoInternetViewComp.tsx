import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { NoInternetSvg } from '../../assets/svgs';
import AppColors from '../../../share/constants/AppColors';
import { useNetworkStatus } from '../../../share/features/context/NetworkProvider';
import AppFonts from '../../../share/constants/AppFonts';

interface NoInternetViewCompTypes {

    onReload?: () => void
}

const NoInternetViewComp: React.FC<NoInternetViewCompTypes> = ({ onReload }) => {
    const { isConnected, checkConnection, connectionLoading } = useNetworkStatus();
    const handleReload = () => {
        checkConnection();
      
        if (onReload) {
            onReload();
        }
    };

    return (
        <View style={styles.emptyContainer}>
            <NoInternetSvg />
            <Text style={styles.emptyTitle}>{'Whoops'}</Text>
            <Text style={styles.emptySubtitle}>
                {'No Internet connection Found,\nPlease check your internet settings.'}
            </Text>
            {/* {onReload && */}

                <TouchableOpacity onPress={() => handleReload()} style={[styles.seeAllChipContainer]}>
                    {connectionLoading && <ActivityIndicator size={'small'} color={'#fff'} />}
                    <Text style={styles.seeAllChipTitle}> Reload</Text>
                </TouchableOpacity>

            {/* } */}
        </View>
    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        paddingHorizontal: 40,

    },
    emptyImage: {
        width: 150,
        height: 150,
        marginBottom: 30,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2C2C2E',
        marginVertical: 10,
        fontFamily:AppFonts.ExtraBold
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#2C2C2E',
        textAlign: 'center',
        marginBottom: 30,
        fontFamily:AppFonts.SemiBold
    },
    seeAllChipContainer: {
        width: '100%',
        borderRadius: 30,
        height: 42,
        backgroundColor: AppColors.THEME_GREEN,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5
        // borderRadius: 30,
        // height: '100%',
    },
    seeAllChipButton: {
        backgroundColor: AppColors.THEME_GREEN,
        borderRadius: 30,
        height: '100%',
    },
    seeAllChipTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily:AppFonts.ExtraBold
    },
})

export default NoInternetViewComp

