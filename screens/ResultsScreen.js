import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { gql, useQuery } from '@apollo/client';
import { useTheme } from '../contexts/ThemeContext';

import Results from '../models/Results';

import HeaderIcon from '../components/UI/HeaderIcon';
import InputResultsTable from '../components/app/InputResultsTable';
import FinancingTable from '../components/app/FinancingTable';
import LoanDetailsTable from '../components/app/LoanDetailsTable';
import ResultsActions from '../components/app/ResultsActions';

const ResultsScreen = props => {
  const theme = useTheme();
  const [ results, setResults ] = useState(null);
  const calculation = (useSelector(state => state.calculation));
  
  const CALCULATION_QUERY = gql`{
      HomeFinancing {
        AlahliCalculator(data: {
            type: ${calculation.type},
            birth_date: ${calculation.birth_date}, 
            job: ${calculation.job}, 
            salary: ${calculation.salary}, 
            monthly_obligations: ${calculation.monthly_obligations || 0},
            personal_financing_installment_amount: ${calculation.personal_financing_installment_amount || null}, 
            personal_financing_installment_months: ${calculation.personal_financing_installment_months || null},
            job_military_rank: ${calculation.job_military_rank || null}
        }) {
          EligibleLoanAmount
          AnnualPercentageRate
          EligibleFinancingTenorYears
          EligibleFinancingTenorMonths
          MonthlyInstalmentsDuringPersonalFinancingPeriod
          TenorDuringPersonalFinancingPeriodMonths
          MonthlyInstalmentsAfterPersonalFinancingMatures
          TenorAfterPersonalFinancingMonths
          MonthlyInstalmentsAfterRetirement
          TenorAfterRetirementMonths
          ResultDetails {
            name_ar
            name_en
            installment
            months
          }
        }
      }
    }`

  const { data, loading, error } = useQuery(CALCULATION_QUERY);

  useEffect(() => {

    if (!loading && error) {
      Alert.alert('حدث خطأ!', error.message, [{ text: 'ارجع', onPress: () => props.navigation.pop() }]);
    }
    if (data && !loading) {
      setResults(new Results(data.HomeFinancing.AlahliCalculator));
    }
  }, [error, data]);

  if (loading || error || results === null) {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <HeaderIcon />
        <InputResultsTable calculation={calculation} />
        <FinancingTable results={results} />
        <LoanDetailsTable resultDetails={results.ResultDetails} />
        <ResultsActions navigation={props.navigation} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 5
  },
  activityContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default ResultsScreen;