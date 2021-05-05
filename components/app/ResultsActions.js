import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRTL } from '../../contexts/RTLContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';

const ResultsActions = (props) => {
    const rtl = useRTL();
    const { t } = useTranslation();
    const theme = useTheme();
    const flexDirection = rtl ? 'row-reverse' : 'row';

    return (
        <View>
            <View style={{ ...styles.buttonsView, flexDirection: flexDirection }}>
                <TouchableOpacity style={{...styles.applyButton, borderColor: theme.primary}}>
                    <Text style={{...styles.applyText, color: theme.primary}}>{t('alahli_calc.alahli_calc_output_apply_button')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.recalculateButton, borderColor: theme.accent}} onPress={() => props.navigation.goBack()}>
                    <Text style={{...styles.recalculateText, color: theme.accent }}>{t('alahli_calc.alahli_calc_output_recalculate_button')}</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.disclaimer}>{t('alahli_calc.alahli_calc_output_disclamer')}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonsView: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#cfcfcf",
        paddingBottom: 25,
        marginBottom: 20,
        marginTop: 40
    },
    applyButton: {
        backgroundColor: "white",
        padding: 20,
        margin: 2,
        borderWidth: 2,
        borderRadius: 8,
    },
    applyText: {
        fontSize: 15,
        fontFamily: 'boutros',
    },
    recalculateButton: {
        backgroundColor: 'white',
        padding: 20,
        margin: 2,
        borderWidth: 2,
        borderRadius: 8,
    },
    recalculateText: {
        fontSize: 15,
        fontFamily: 'boutros',
    },
    disclaimer: {
        fontSize: 12,
        fontFamily: 'boutros',
        marginBottom: 10
    }
});

export default ResultsActions;