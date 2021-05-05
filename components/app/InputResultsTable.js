import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRTL } from '../../contexts/RTLContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';

import { getFormatedDate, getJob, getRank } from '../../functions/ResultsFunctions';

const InputResultsTable = (props) => {
    const rtl = useRTL();
    const theme = useTheme();
    const { t } = useTranslation();

    const date = getFormatedDate(props.calculation.birth_date);
    const job = getJob(props.calculation.job, t);
    const rank = getRank(props.calculation.job_military_rank, t);

    const flexDirection = rtl ? 'row-reverse' : 'row';
    const leftText = rtl ? 'left' : 'right';
    const rightText = rtl ? 'right' : 'left';

    return (
        <View style={styles.table}>
            <View style={{ ...styles.tableRowWhite, flexDirection: flexDirection }}>
                <View style={{ ...styles.tableItem, flexDirection: flexDirection }}>
                    <Text style={{ ...styles.tableTextRight, textAlign: rightText }}>{t('alahli_calc.alahli_calc_redf_qualified')}</Text>
                    {props.calculation.type === 'REDF' ?
                        <Text style={{ ...styles.tableTextLeft, textAlign: leftText, color: theme.primary }}>{t('alahli_calc.alahli_calc_yes')}</Text>
                        :
                        <Text style={{ ...styles.tableTextLeft, textAlign: leftText, color: theme.primary }}>{t('alahli_calc.alahli_calc_no')}</Text>}
                </View>
                <View style={{ ...styles.tableItem, flexDirection: flexDirection }}>
                    <Text style={{ ...styles.tableTextRight, textAlign: rightText }}>{t('alahli_calc.alahli_calc_birthdate')}</Text>
                    <Text style={{ ...styles.tableTextLeft, textAlign: leftText, color: theme.primary }}>{date.toString()}</Text>
                </View>
            </View>
            <View style={{ ...styles.tableRowGrey, flexDirection: flexDirection }}>
                <View style={{ ...styles.tableItem, flexDirection: flexDirection }}>
                    <Text style={{ ...styles.tableTextRight, textAlign: rightText }}>{t('alahli_calc.alahli_calc_salary')}</Text>
                    <Text style={{ ...styles.tableTextLeft, textAlign: leftText, color: theme.primary }}>{props.calculation.salary} {t('alahli_calc.alahli_calc_output_riyal')}</Text>
                </View>
                <View style={{ ...styles.tableItem, flexDirection: flexDirection }}>
                    <Text style={{ ...styles.tableTextRight, textAlign: rightText }}>{t('alahli_calc.alahli_calc_obligation')}</Text>
                    <Text style={{ ...styles.tableTextLeft, textAlign: leftText, color: theme.primary }}>{props.calculation.monthly_obligations} {t('alahli_calc.alahli_calc_output_riyal')}</Text>
                </View>
            </View>
            <View style={{ ...styles.tableRowWhite, flexDirection: flexDirection }}>
                <View style={{ ...styles.tableItem, flexDirection: flexDirection }}>
                    <Text style={{ ...styles.tableTextRight, textAlign: rightText }}>{t('alahli_calc.alahli_calc_personal_loan_question_yes_installment')}</Text>
                    <Text style={{ ...styles.tableTextLeft, textAlign: leftText, color: theme.primary }}>{props.calculation.personal_financing_installment_amount || "-"} {t('alahli_calc.alahli_calc_output_riyal')}</Text>
                </View>
                <View style={{ ...styles.tableItem, flexDirection: flexDirection }}>
                    <Text style={{ ...styles.tableTextRight, textAlign: rightText }}>{t('alahli_calc.alahli_calc_personal_loan_question_yes_months')}</Text>
                    <Text style={{ ...styles.tableTextLeft, textAlign: leftText, color: theme.primary }}>{props.calculation.personal_financing_installment_months || "-"} {t('alahli_calc.alahli_calc_output_month')}</Text>
                </View>
            </View>
            <View style={{ ...styles.tableRowGrey, flexDirection: flexDirection }}>
                <View style={{ ...styles.tableItem, flexDirection: flexDirection }}>
                    <Text style={{ ...styles.tableTextRight, textAlign: rightText }}>{t('alahli_calc.alahli_calc_job')}</Text>
                    <Text style={{ ...styles.tableTextLeft, textAlign: leftText, color: theme.primary }}>{job}</Text>
                </View>
                {props.calculation.job_military_rank ?
                    <View style={{ ...styles.tableItem, flexDirection: flexDirection }}>
                        <Text style={{ ...styles.tableTextRight, textAlign: rightText }}>{t('alahli_calc.alahli_calc_job_military_rank')}</Text>
                        <Text style={{ ...styles.tableTextLeft, textAlign: leftText, color: theme.primary }}>{rank}</Text>
                    </View> :
                    <View style={{ ...styles.tableItem, flexDirection: flexDirection }}>
                        <Text style={{ ...styles.tableTextLeft, textAlign: leftText, color: theme.primary }}>-</Text>
                    </View>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    table: {
        marginTop: 30
    },
    tableRowWhite: {
        backgroundColor: 'white',
        minHeight: 40,
    },
    tableRowGrey: {
        backgroundColor: '#c0c0c0',
        minHeight: 40
    },
    tableItem: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: '#cfcfcf',
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
        flex: 1.35,
        marginRight: 4,
        fontFamily: 'boutros'
    }
});

export default InputResultsTable;