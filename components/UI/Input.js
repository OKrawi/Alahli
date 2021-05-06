import React, { useReducer, useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Switch } from 'react-native';
import { useRTL } from '../../contexts/RTLContext';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getHijriFromGregorian, getGregorianFromHijri, getOrderedDate, getEpochDate } from '../../functions/CalculationFunctions';
import { useTranslation } from 'react-i18next';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      }
    default:
      return state;
  }
};

const Input = props => {
  const [isHijriDate, setIsHijriDate] = useState(false);
  const { t } = useTranslation();

  const [date, setDate] = useState(new Date(946684800000));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dateInput = useRef(null);

  const rtl = useRTL();
  const theme = useTheme();
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initiallyValid,
    touched: false
  });

  const reverseFlexDirection = rtl ? 'row' : 'row-reverse';
  const flexDirection = rtl ? 'row-reverse' : 'row';

  const onChangeDatePicker = (event, selectedDate) => {
    setShowDatePicker(false);
    if (event.type === "set") {
      dispatch({ type: INPUT_CHANGE, value: getOrderedDate(selectedDate), isValid: true });
      dispatch({ type: INPUT_BLUR });
    }
    setDate(selectedDate || date);
  };

  const openDatePicker = () => {
      setShowDatePicker(true);
    }
  
  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      let value = inputState.value;
      if(props.date && inputState.isValid){
        value = getEpochDate(value, isHijriDate);
        setDate(new Date(Number(value)))
      }
      onInputChange(id, value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = text => {
    const grigorianDateRegex = /^(?:(?:31(\/)(?:0[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0[13-9]|1[0-2])\2))(?:(19[0-9]\d|200[0-1]))$|^(?:29(\/)02\4(?:(?:(?:19)(?:0[48]|[2468][048]|[13579][26])|(?:2000))))$|^(?:0[1-9]|1\d|2[0-8])(\/)(?:(?:0[1-9])|(?:1[0-2]))\5(19[0-9]\d|200[0-1])$/;
    const hijriDateRegex = /^((0|1|2)[0-9]|30)(\/)(1[0-2]|0[1-9])(\/)(14[0-2]{1}[0-6]{1}|(13[0-9]{2}))$/;
    const numberRegex = /^[0-9]*$/;

    let isValid = true;

    if (props.required && text.trim().length === 0) {
      isValid = false;
    }

    if (props.date && !isHijriDate && !grigorianDateRegex.test(text)) {
      isValid = false;
    }

    if (props.date && isHijriDate && (!hijriDateRegex.test(text) || getEpochDate(text, true) === "ERROR")) {
      isValid = false;
    }

    if (props.min != null && +text < props.min) {
      isValid = false;
    }

    if (props.max != null && +text > props.max) {
      isValid = false;
    }

    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    if (props.numeric && !numberRegex.test(text)) {
      isValid = false;
    }

    if (props.date) {
      text = text.replace(/^(\d\d)(\d)$/g, '$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g, '$1/$2').replace(/[^\d\/]/g, '');
    }

    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  const onHijriSwitchChanged = () => {
    if (inputState.isValid) {
      let switchDate;
      if (!isHijriDate) {
        switchDate = getHijriFromGregorian(inputState.value, true);
      } else {
        switchDate = getGregorianFromHijri(inputState.value, false);
      }
      dispatch({ type: INPUT_CHANGE, value: switchDate, isValid: true });
    } else {
      dispatch({ type: INPUT_CHANGE, value: "", isValid: false });
      dateInput?.current?.clear();
    }
    setIsHijriDate(previousState => !previousState);
  }

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}{props.required ? <Text style={styles.redStar}> *</Text> : null}</Text>
      <View style={{ ...styles.inputIconContainer, flexDirection: flexDirection }}>
        <TextInput
          {...props}
          value={inputState.value}
          style={styles.input}
          onChangeText={textChangeHandler}
          onBlur={lostFocusHandler}
          ref={props.refs}
          textAlign={rtl ? 'right' : 'left'}
        />{props.icon && !isHijriDate ?
          <Ionicons
            style={styles.icon}
            name={Platform.OS === 'android' ? 'md-calendar' : 'ios-calendar'}
            size={23}
            onPress={openDatePicker}
            color={theme.primary} /> : null
        }
      </View>
      {!inputState.isValid && inputState.touched && props.required && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
      {props.date && <View>
        <View style={{ ...styles.isHijriContainer, flexDirection: reverseFlexDirection }}>
        <Text style={styles.isHijriText}>{t('alahli_calc.alahli_calc_birthdate_hijri_toggle')}</Text>
        <Switch
          trackColor={{ false: "#767577", true: theme.primary }}
          thumbColor={isHijriDate ? "white" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          value={isHijriDate}
          onValueChange={onHijriSwitchChanged}
        />
      </View>
      {showDatePicker && <DateTimePicker
        testID="dateTimePicker"
        value={date}
        display="spinner"
        maximumDate={new Date(2001, 11, 30)}
        minimumDate={new Date(1900, 0, 1)}
        onChange={onChangeDatePicker}
      />}
      </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
    overflow: 'hidden'
  },
  label: {
    fontFamily: 'boutros',
    marginBottom: 8,
    marginTop: 35,
  },
  redStar: {
    color: 'red',
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    fontFamily: 'boutros',
    flex: 1
  },
  errorContainer: {
    marginVertical: 5
  },
  icon: {
    padding: 8,
    borderRadius: 12
  },
  errorText: {
    fontFamily: 'boutros',
    color: 'red',
    fontSize: 13
  },
  inputIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  isHijriContainer: {
    justifyContent: 'flex-end',
  },
  isHijriText: {
    fontSize: 14,
    fontFamily: 'boutros'
  }
});

export default Input;