export const SET_CALCULATION_DATA = 'SET_CALCULATION_DATA';

export const setCalculation = (calculationData) => {
  return async (dispatch) => {
    dispatch({
      type: SET_CALCULATION_DATA,
      calculationData
    });
  };
};

