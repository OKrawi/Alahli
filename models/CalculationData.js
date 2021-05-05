class CalculationData {
    constructor(
        type,
        birth_date,
        job,
        salary,
        personal_financing_installment_amount,
        personal_financing_installment_months,
        job_military_rank,
        monthly_obligations
    ) {
        this.type = type;
        this.birth_date = birth_date;
        this.job = job;
        this.salary = salary;
        this.personal_financing_installment_amount = personal_financing_installment_amount;
        this.personal_financing_installment_months = personal_financing_installment_months;
        this.job_military_rank = job_military_rank;
        this.monthly_obligations = monthly_obligations;
    }
}

export default CalculationData;