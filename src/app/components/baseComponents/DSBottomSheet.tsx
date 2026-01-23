import React, { useCallback, useMemo, forwardRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BackBtnSvg, CloseSvg } from '../../assets/svgs';
import AppFonts from '../../../share/constants/AppFonts';
import DSButton from './DSButton';
import { SafeAreaView } from 'react-native-safe-area-context';

interface DSBottomSheetProps {
    title: string;
    subtitle?: string;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
    onConfirm: () => void;
    onClose?: () => void;
}

const DSBottomSheet = forwardRef<BottomSheet, DSBottomSheetProps>(({
    title,
    subtitle,
    onConfirm,
    onClose,
    isLoading
}, ref) => {


    const snapPoints = useMemo(() => ['25%'], []);

    const handleClose = useCallback(() => {
        if (onClose) {
            onClose();
        } else {
            // @ts-ignore -ref is a BottomSheet ref
            ref?.current?.close();
        }
    }, [onClose, ref]);


    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.5}
            />
        ),
        []
    );

    return (
        <BottomSheet
            ref={ref}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            backdropComponent={renderBackdrop}
            backgroundStyle={styles.sheetBackground}
            handleIndicatorStyle={styles.indicator}
            handleComponent={null}

        >
            <BottomSheetView style={styles.contentContainer}>

                {/* 1. Header Section */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>{title}</Text>
                    <TouchableOpacity style={styles.svgView} onPress={handleClose}>
                        <CloseSvg />
                    </TouchableOpacity>
                </View>

                <View style={styles.divider} />

                {/* 2. Body Text */}

                <View style={styles.body}>
                    <Text style={styles.bodyText}>
                        {subtitle}
                    </Text>
                </View>
                <SafeAreaView style={styles.buttonRow}>
                  
                    {/* Cancel Button */}
                    <DSButton
                        label="Cancel"
                        variant="outlined"
                        onPress={handleClose}
                        style={styles.filledButton}
                    />
                    {/* Confirm Button*/}
                    <DSButton
                        label="Yes, Sure"
                        variant="filled"
                        onPress={onConfirm}
                        style={styles.filledButton}
                        loading={isLoading?isLoading:false}
                    />



                </SafeAreaView>

            </BottomSheetView>
        </BottomSheet>
    );
});

const styles = StyleSheet.create({
    sheetBackground: {
        borderRadius: 24,
        // backgroundColor: 'red'
    },
    indicator: {
        backgroundColor: '#E0E0E0',
        width: 40,
    },
    contentContainer: {

        // flex: 1,
        paddingHorizontal: 24,
        paddingTop: 10,
    },

    // Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
        fontFamily: AppFonts.SemiBold
    },
    closeButton: {
        padding: 6,
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
    },
    divider: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginHorizontal: -24,
        marginBottom: 20,
    },

    // Body
    body: {
        alignItems: 'center',
        // marginBottom: 20,
        paddingHorizontal: 24,
    },
    bodyText: {
        fontSize: 16,
        color: '#1F1F1F',
        textAlign: 'center',
        lineHeight: 24,
        // fontWeight: '500',
    },

    // Buttons
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        paddingHorizontal: 24,
        paddingTop: -20
    },
    button: {
        flex: 1,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filledButton: {
        width: 130
        // backgroundColor: '#1F3B25', // Dark Green
    },

    svgView: {
        width: 29, height: 28,
        borderWidth: 1, borderColor: '#DDDD',
        borderRadius: 20, backgroundColor: '#fff',
        justifyContent: 'center', alignItems: 'center'
    },
});

export default DSBottomSheet;