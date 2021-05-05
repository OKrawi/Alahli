import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRTL } from '../../contexts/RTLContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';

const LoanDetailsTable = (props) => {
    const rtl = useRTL();
    const theme = useTheme();
    const { t } = useTranslation();
    const flexDirection = rtl ? 'row-reverse' : 'row';

    const loanColumn = props.resultDetails.map(result => {
        return (
            <View style={styles.container} key={result.name_en}>
                <Text style={{...styles.itemText, 'backgroundColor': 'white'}}>{rtl ? result.name_ar : result.name_en}</Text>
                <Text style={{...styles.itemText, 'backgroundColor': '#c0c0c0'}}><Text style={{color: theme.primary}}>{result.installment}</Text></Text>
                <Text style={{...styles.itemText, 'backgroundColor': 'white'}}><Text style={{color: theme.primary}}>{result.months}</Text></Text>
            </View>
        )
    });

    return (
        <View style={{...styles.dynamicTable, 'flexDirection': flexDirection}}>
            <View style={styles.container}>
                <View>
                    <Text style={{...styles.itemText, 'backgroundColor': 'white'}}></Text>
                </View>
                <View>
                    <Text style={{...styles.itemText, 'backgroundColor': '#c0c0c0'}}>{t('alahli_calc.alahli_calc_output_result_details_installment_key')}</Text>
                </View>
                <View>
                    <Text style={{...styles.itemText, 'backgroundColor': 'white'}}>{t('alahli_calc.alahli_calc_output_result_details_months_key')}</Text>
                </View>
            </View>
            {loanColumn.map(item => item)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemText: {
        borderWidth: 0.5,
        borderColor: '#cfcfcf',
        flex: 1,
        minHeight: 85,
        textAlign: 'center',
        fontFamily: 'boutros',
        padding: 5,
        textAlignVertical: 'center',
    },
    dynamicTable: {
        borderWidth: 0.5,
        borderColor: '#cfcfcf',
    }
});

export default LoanDetailsTable;