import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useRTL } from '../../contexts/RTLContext';

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
      };
    default:
      return state;
  }
};

const Input = props => {
  const rtl = useRTL();

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initiallyValid,
    touched: false
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = text => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const grigorianDateRegex = /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(19[0-9]\d|200[0-1]))$|^(?:29(\/)0?2\4(?:(?:(?:19)(?:0[48]|[2468][048]|[13579][26])|(?:2000))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\5(19[0-9]\d|200[0-1])$/;
    const hijriDateRegex = /^([1-9]|(0|1|2)[0-9]|30)(\/|-|\.)([1-9]|1[0-2]|0[1-9])(\/|-|\.)(14[0-2]{1}[0-6]{1}|(13[0-9]{2}))$/;
    const numberRegex = /^[0-9]*$/;

    let isValid = true;

    if (props.required && text.trim().length === 0) {
      isValid = false;
    }

    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }

    if (props.date && !props.isHijriDate && !grigorianDateRegex.test(text)) {
      isValid = false;
    }

    if (props.date && props.isHijriDate && !hijriDateRegex.test(text)) {
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

    if(props.numeric && !numberRegex.test(text)){
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

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}{props.required ? <Text style={styles.redStar}> *</Text> : null}</Text>
      <TextInput
        {...props}
        value={inputState.value}
        style={styles.input}
        onChangeText={textChangeHandler}
        onBlur={!props.initiallyValid ? lostFocusHandler : null}
        ref={props.refs}
        textAlign={rtl ? 'right' : 'left'}
      />
      {!inputState.isValid && inputState.touched && props.required && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: 'boutros',
    marginBottom: 8,
    marginTop: 35,
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    fontFamily: 'boutros',
  },
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    fontFamily: 'boutros',
    color: 'red',
    fontSize: 13
  },
  redStar: {
    color: 'red',
  }
});

export default Input;
