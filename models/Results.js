import ResultDetailsArray from './ResultDetailsArray';

class Results {
    constructor(obj) {
        this.EligibleLoanAmount = obj.EligibleLoanAmount;
        this.AnnualPercentageRate = obj.AnnualPercentageRate;
        this.EligibleFinancingTenorYears = obj.EligibleFinancingTenorYears;
        this.EligibleFinancingTenorMonths = obj.EligibleFinancingTenorMonths;
        this.MonthlyInstalmentsDuringPersonalFinancingPeriod = obj.MonthlyInstalmentsDuringPersonalFinancingPeriod;
        this.TenorDuringPersonalFinancingPeriodMonths = obj.TenorDuringPersonalFinancingPeriodMonths;
        this.MonthlyInstalmentsAfterPersonalFinancingMatures = obj.MonthlyInstalmentsAfterPersonalFinancingMatures;
        this.TenorAfterPersonalFinancingMonths = obj.TenorAfterPersonalFinancingMonths;
        this.MonthlyInstalmentsAfterRetirement = obj.MonthlyInstalmentsAfterRetirement;
        this.TenorAfterRetirementMonths = obj.TenorAfterRetirementMonths;
        this.ResultDetails = [];
        obj.ResultDetails.forEach(ResultDetail =>
            this.ResultDetails.push(new ResultDetailsArray(ResultDetail))
        );
    }
}

export default Results;