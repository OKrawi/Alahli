import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRTL } from '../../contexts/RTLContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';

import { getTotalLoanCosts } from '../../functions/ResultsFunctions';

const FinancingTable = (props) => {
    const rtl = useRTL();
    const { t } = useTranslation();
    const theme = useTheme();

    const total_loan_cost = getTotalLoanCosts(props.results);

    const flexDirection = rtl ? 'row-reverse' : 'row';
    const leftText = rtl ? 'left' : 'right';
    const rightText = rtl ? 'right' : 'left';

    return (
        <View style={styles.table}>
            <View style={{ ...styles.tableRowWhite, flexDirection: flexDirection }}>
                <Text style={{ ...styles.tableTextRight, textAlign: rightText }}>{t('alahli_calc.alahli_calc_output_eligible_loan_amount')}</Text>
                <Text style={{ ...styles.tableTextLeft, textAlign: leftText, color: theme.primary }}>{props.results.EligibleLoanAmount || "-"} {t('alahli_calc.alahli_calc_output_riyal')}</Text>
            </View>
            <View style={{ ...styles.tableRowGrey, flexDirection: flexDirection }}>
                <Text style={{ ...styles.tableTextRight, textAlign: rightText }}>{t('alahli_calc.alahli_calc_output_total_loan_cost')}</Text>
                <Text style={{ ...styles.tableTextLeft, textAlign: leftText, color: theme.primary }}>{total_loan_cost  || "-"} {t('alahli_calc.alahli_calc_output_riyal')}</Text>
            </View>
            <View style={{ ...styles.tableRowWhite, flexDirection: flexDirection }}>
                <Text style={{ ...styles.tableTextRight, textAlign: rightText }}>{t('alahli_calc.alahli_calc_output_eligible_financing_tenor_months')}</Text>
                <Text style={{ ...styles.tableTextLeft, textAlign: leftText, color: theme.primary }}>{props.results.EligibleFinancingTenorMonths  || "-"} {t('alahli_calc.alahli_calc_output_month')}</Text>
            </View>
            <View style={{ ...styles.tableRowGrey, flexDirection: flexDirection }}>
                <Text style={{ ...styles.tableTextRight, textAlign: rightText }}>{t('alahli_calc.alahli_calc_output_eligible_financing_tenor_years')}</Text>
                <Text style={{ ...styles.tableTextLeft, textAlign: leftText, color: theme.primary }}>{props.results.EligibleFinancingTenorYears  || "-"} {t('alahli_calc.alahli_calc_output_year')}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    table: {
        borderColor: '#cfcfcf',
        borderWidth: 1,
        marginVertical: 30
    },
    tableRowWhite: {
        backgroundColor: 'white',
        minHeight: 40,
        padding: 5
    },
    tableRowGrey: {
        backgroundColor: '#c0c0c0',
        flexDirection: 'row',
        minHeight: 40,
        padding: 5
    },
    tableTextLeft: {
        textAlignVertical: 'center',
        flex: 1,
        marginLeft: 4,
        fontSize: 15,
        fontFamily: 'boutros'
    },
    tableTextRight: {
        textAlignVertical: 'center',
        flex: 1.5,
        marginRight: 6,
        fontFamily: 'boutros'
    }
});

export default FinancingTable;