import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { useRTL } from '../../contexts/RTLContext';
import CalculationTypes from '../../constants/CalculationTypes';

const yesRedfArgs = [
    {
        inputIdentifier: 'alahli_calc_redf_qualified',
        inputValue: true,
        inputValidity: true
    },
    {
        inputIdentifier: 'alahli_calc_type',
        inputValue: CalculationTypes.redf,
        inputValidity: true
    }
];

const noRedfArgs = [
    {
        inputIdentifier: 'alahli_calc_redf_qualified',
        inputValue: false,
        inputValidity: true
    },
    {
        inputIdentifier: 'alahli_calc_type',
        inputValue: CalculationTypes.standard,
        inputValidity: true
    }
];

const yesLoanArgs = [
    {
        inputIdentifier: 'alahli_calc_personal_loan_question',
        inputValue: true,
        inputValidity: true
    },
    {
        inputIdentifier: 'alahli_calc_personal_loan_question_yes_installment',
        inputValue: '',
        inputValidity: false
    },
    {
        inputIdentifier: 'alahli_calc_personal_loan_question_yes_months',
        inputValue: '',
        inputValidity: false
    },
];

const noLoanArgs = [
    {
        inputIdentifier: 'alahli_calc_personal_loan_question',
        inputValue: false,
        inputValidity: true
    },
    {
        inputIdentifier: 'alahli_calc_personal_loan_question_yes_installment',
        inputValue: '',
        inputValidity: true
    },
    {
        inputIdentifier: 'alahli_calc_personal_loan_question_yes_months',
        inputValue: '',
        inputValidity: true
    },
];

const ConfirmSwitch = (props) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const rtl = useRTL();
    const [selection, setSelection] = useState(null);

    const { onSwitch } = props;
    const flexDirection = rtl ? 'row-reverse' : 'row';

    useEffect(() => {
            if(selection !== null){
                if(props.type === 'redf'){
                    if(selection){
                        onSwitch(yesRedfArgs);
                    } else {
                        onSwitch(noRedfArgs);
                    }
                } else if(props.type === 'loan'){
                    if(selection){
                        onSwitch(yesLoanArgs);
                    } else {
                        onSwitch(noLoanArgs);
                    }
                }
            }
    }, [onSwitch, selection]);

    return (
        <View>
            <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitle}>{props.title}</Text>
            </View>

            <View style={{ ...styles.switch, flexDirection: flexDirection }}>
                <TouchableOpacity
                    style={props.answer ? {...styles.selectedOpacity, backgroundColor: theme.primary} : styles.nonSelectedOpacity}
                    onPress={() => {
                        setSelection(true);
                    }}>
                    <Text style={props.answer ? styles.selectedText : {...styles.nonSelectedText, color: theme.primary}}>{t('alahli_calc.alahli_calc_yes')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={!props.answer ? {...styles.selectedOpacity, backgroundColor: theme.primary} : styles.nonSelectedOpacity}
                    onPress={() => {
                        setSelection(false)
                    }}>
                    <Text style={!props.answer ? styles.selectedText : {...styles.nonSelectedText, color: theme.primary}}>{t('alahli_calc.alahli_calc_no')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerTitleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'boutros'
    },
    switch: {
        borderWidth: 3,
        borderColor: '#e8e8e8',
        overflow: 'hidden',
        borderRadius: 15,
        height: 50,
    },
    selectedOpacity: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nonSelectedOpacity: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedText: {
        color: 'white',
        fontFamily: 'boutros'
    },
    nonSelectedText: {
        fontFamily: 'boutros'
    },
})

export default ConfirmSwitch;
