import { SET_CALCULATION_DATA } from '../actions/calculation';
import CalculationData from '../../models/CalculationData';

const initialState = {
    calculationData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CALCULATION_DATA:
        const calculationData = new CalculationData(
            action.calculationData.alahli_calc_type,
            action.calculationData.alahli_calc_birthdate,
            action.calculationData.alahli_calc_job,
            action.calculationData.alahli_calc_salary,
            action.calculationData.alahli_calc_personal_loan_question_yes_installment,
            action.calculationData.alahli_calc_personal_loan_question_yes_months,
            action.calculationData.alahli_calc_job_military_rank,
            action.calculationData.alahli_calc_obligation
        );
        return calculationData;
  }
  return state;
};
