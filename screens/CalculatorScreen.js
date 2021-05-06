import React, { useState, useEffect, useReducer, useCallback, useRef } from 'react';
import { ScrollView, View, StyleSheet, Alert, Text, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRTL } from '../contexts/RTLContext';
import { useTheme } from '../contexts/ThemeContext';

import * as calculatorActions from '../store/actions/calculation';
import CalculationTypes from '../constants/CalculationTypes';

import HeaderIcon from "../components/UI/HeaderIcon"
import ConfirmSwitch from '../components/app/ConfirmSwitch'
import Input from '../components/UI/Input';
import DropDownPicker from 'react-native-dropdown-picker';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const calculatorScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const rtl = useRTL();
  const theme = useTheme();

  const obligationInput = useRef(null);
  const salaryInput = useRef(null);
  const monthsInput = useRef(null);
  const dateInput = useRef(null);

  const jobDropdown = useRef(null);
  const militaryDropdown = useRef(null);

  const [jobDropdownPickerOpened, setjobDropdownPickerOpened] = useState(false);
  const [militaryDropdownPickerOpened, setmilitaryDropdownOpened] = useState(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      alahli_calc_personal_loan_question_yes_installment: '',
      alahli_calc_personal_loan_question_yes_months: '',
      alahli_calc_salary: '',
      alahli_calc_obligation: '',
      alahli_calc_job: '',
      alahli_calc_job_military_rank: '',
      alahli_calc_birthdate: '',
      alahli_calc_redf_qualified: true,
      alahli_calc_personal_loan_question: false,
      alahli_calc_type: CalculationTypes.redf
    },
    inputValidities: {
      alahli_calc_personal_loan_question_yes_installment: true,
      alahli_calc_personal_loan_question_yes_months: true,
      alahli_calc_salary: false,
      alahli_calc_obligation: true,
      alahli_calc_job: false,
      alahli_calc_job_military_rank: true,
      alahli_calc_birthdate: false,
      alahli_calc_redf_qualified: true,
      alahli_calc_personal_loan_question: true
    },
    formIsValid: false
  });

  const jobDropdownPickerItems = [
    { label: t('job_fields.civilian'), value: 'CIVILIAN' },
    { label: t('job_fields.military'), value: 'MILITARY' },
    { label: t('job_fields.private'), value: 'PRIVATE' },
    { label: t('job_fields.retiree'), value: 'RETIREE' },
  ];

  const militaryDropdownPickerItems = [
    { label: t('military_ranks.private'), value: 'PRIVATE' },
    { label: t('military_ranks.corporal'), value: 'CORPORAL' },
    { label: t('military_ranks.vice_sergeant'), value: 'VICE_SERGEANT' },
    { label: t('military_ranks.sergeant'), value: 'SERGEANT' },
    { label: t('military_ranks.first_class_sergeant'), value: 'FIRST_CLASS_SERGEANT' },
    { label: t('military_ranks.master_sergeant'), value: 'MASTER_SERGEANT' },
    { label: t('military_ranks.lieutenant'), value: 'LIEUTENANT:' },
    { label: t('military_ranks.captain'), value: 'CAPTAIN' },
    { label: t('military_ranks.major'), value: 'MAJOR' },
    { label: t('military_ranks.lieutenant_colonel'), value: 'LIEUTENANT_COLONEL' },
    { label: t('military_ranks.colonel'), value: 'COLONEL:' },
    { label: t('military_ranks.brigadier_general'), value: 'BRIGADIER_GENERAL' },
    { label: t('military_ranks.general'), value: 'GENERAL' },
  ];

  const flexDirection = rtl ? 'row-reverse' : 'row';

  useEffect(() => {
    if (error) {
      Alert.alert(t('error.error_occured'), error, [{ text: t("error.ok") }]);
    }
  }, [error]);

  const submitHandler = async () => {
    if (formState.formIsValid) {
      const action = calculatorActions.setCalculation(formState.inputValues);
      setError(null);
      setIsLoading(true);
      try {
        dispatch(action);
        setIsLoading(false);
        props.navigation.navigate('Results');
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const switchChangeHandler = useCallback(
    (switchArgs) => {
      switchArgs.forEach(item => {
        inputChangeHandler(item.inputIdentifier, item.inputValue, item.inputValidity);
      });
    }, []
  );

  if (isLoading) {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (jobDropdown.current.isOpen()) {
            jobDropdown.current.close();
          }
          if (formState.inputValues.alahli_calc_job === "MILITARY" && militaryDropdown.current.isOpen()) {
            militaryDropdown.current.close();
          }
        }}>
        <View>

          <HeaderIcon />

          <ConfirmSwitch
            answer={formState.inputValues.alahli_calc_redf_qualified}
            title={t('alahli_calc.alahli_calc_redf_qualified')}
            onSwitch={switchChangeHandler}
            type={'redf'}
          />

          <ConfirmSwitch
            answer={formState.inputValues.alahli_calc_personal_loan_question}
            title={t('alahli_calc.alahli_calc_personal_loan_question')}
            onSwitch={switchChangeHandler}
            type={'loan'}
          />

          {formState.inputValues.alahli_calc_personal_loan_question ?
            <View>
              <Input
                id="alahli_calc_personal_loan_question_yes_installment"
                label={t('alahli_calc.alahli_calc_personal_loan_question_yes_installment')}
                keyboardType="numeric"
                required
                numeric
                errorText={t('validators.numerical')}
                onInputChange={inputChangeHandler}
                initialValue=""
                initiallyValid={false}
                returnKeyType="next"
                onSubmitEditing={() => monthsInput.current.focus()}
                blurOnSubmit={false}
                min={0}
              />
              <Input
                id="alahli_calc_personal_loan_question_yes_months"
                label={t('alahli_calc.alahli_calc_personal_loan_question_yes_months')}
                keyboardType="numeric"
                required
                numeric
                errorText={t('validators.numerical')}
                onInputChange={inputChangeHandler}
                initialValue=""
                initiallyValid={false}
                returnKeyType="next"
                refs={monthsInput}
                min={0}
              />
            </View>
            : null}

          <Input
            id="alahli_calc_birthdate"
            label={t('alahli_calc.alahli_calc_birthdate')}
            keyboardType="numeric"
            required
            date
            maxLength={10}
            errorText={t('validators.date')}
            onInputChange={inputChangeHandler}
            initiallyValid={false}
            placeholder={t('validators.date_placeholder')}
            refs={dateInput}
            returnKeyType="next"
            blurOnSubmit={false}
            icon="calendar"
            onSubmitEditing={() => salaryInput.current.focus()}
          />

          <Input
            id="alahli_calc_salary"
            label={t('alahli_calc.alahli_calc_salary')}
            keyboardType="numeric"
            required
            numeric
            errorText={t('validators.numerical')}
            onInputChange={inputChangeHandler}
            initiallyValid={false}
            returnKeyType="next"
            refs={salaryInput}
            blurOnSubmit={false}
            min={0}
            onSubmitEditing={() => obligationInput.current.focus()}
          />

          <Input
            id="alahli_calc_obligation"
            label={t('alahli_calc.alahli_calc_obligation')}
            keyboardType="numeric"
            numeric
            errorText={t('validators.numerical')}
            onInputChange={inputChangeHandler}
            initiallyValid={true}
            returnKeyType="done"
            refs={obligationInput}
          />

          <View>
            <Text style={styles.label}>{t('alahli_calc.alahli_calc_job')}<Text style={styles.redStar}> *</Text></Text>
            <DropDownPicker
              zIndex={5000}
              items={jobDropdownPickerItems}
              onClose={() => setjobDropdownPickerOpened(true)}
              onChangeItem={item => {
                inputChangeHandler('alahli_calc_job', item.value, true);
                if (item.value === 'MILITARY') {
                  inputChangeHandler('alahli_calc_job_military_rank', '', false);
                } else {
                  inputChangeHandler('alahli_calc_job_military_rank', '', true);
                }
              }}
              controller={(instance) => jobDropdown.current = instance}
              placeholder={t('alahli_calc.alahli_calc_choose_job')}
              dropDownMaxHeight={500}
              style={{ flexDirection: flexDirection }}
              labelStyle={{
                fontFamily: 'boutros',
                fontSize: 15
              }}
              containerStyle={{ height: 40 }}
              style={{ backgroundColor: '#fafafa' }}
              itemStyle={{ justifyContent: rtl ? 'flex-end' : 'flex-start' }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
            />
          </View>
          {!formState.inputValidities.alahli_calc_job && jobDropdownPickerOpened && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{t('validators.validator_job')}</Text>
            </View>
          )}

          {formState.inputValues.alahli_calc_job === "MILITARY" ? <View style={styles.militaryDropdownPickerContainer}>
            <Text style={styles.label}>{t('alahli_calc.alahli_calc_job_military_rank')}<Text style={styles.redStar}> *</Text></Text>
            <DropDownPicker
              items={militaryDropdownPickerItems}
              controller={(instance) => militaryDropdown.current = instance}
              placeholder={t('alahli_calc.alahli_calc_choose_military_rank')}
              onClose={() => setmilitaryDropdownOpened(true)}
              onChangeItem={item => {
                inputChangeHandler('alahli_calc_job_military_rank', item.value, true);
              }}
              style={{ flexDirection: flexDirection }}
              containerStyle={{ height: 40 }}
              style={{ backgroundColor: '#fafafa' }}
              itemStyle={{ justifyContent: rtl ? 'flex-end' : 'flex-start' }}
              labelStyle={{
                fontFamily: 'boutros',
                fontSize: 15
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
            />
            {!formState.inputValidities.alahli_calc_job_military_rank && militaryDropdownPickerOpened && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{t('validators.validator_rank')}</Text>
              </View>
            )}
          </View>

            : null}

          <View style={styles.submitButtonContainer}>
            <TouchableOpacity
              onPress={submitHandler}
              disabled={!formState.formIsValid}
              style={formState.formIsValid ? { ...styles.submitValidOpacity, backgroundColor: theme.primary } : styles.submitInvalidOpacity}>
              <Text style={{ ...styles.submitButtonText, 'color': formState.formIsValid ? "white" : '#f5f5f5' }}>{t('alahli_calc.alahli_calc_calculate_button')}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  militaryDropdownPickerContainer: {
    marginBottom: 20
  },
  submitButtonContainer: {
    paddingVertical: 30,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#e8e8e8",
    marginBottom: 20
  },
  submitValidOpacity: {
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12
  },
  submitInvalidOpacity: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#c8c8c8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12
  },
  submitButtonText: {
    fontFamily: 'boutros',
    fontSize: 20
  },
  label: {
    fontFamily: 'boutros',
    marginBottom: 8,
    marginTop: 35,
  },
  redStar: {
    color: 'red',
  },
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    fontFamily: 'boutros',
    color: 'red',
    fontSize: 13
  }
});

export default calculatorScreen;