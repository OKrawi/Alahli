export function getFormatedDate(epochValue) {
    const unformated_date = new Date(Number(epochValue));

    const d = ("0"+String(unformated_date.getDate())).slice(-2);
    const m = ("0"+String(unformated_date.getMonth() + 1)).slice(-2);
    const y = unformated_date.getFullYear();
    return `${d}/${m}/${y}`;
}

export function getTotalLoanCosts(results) {
      return (
        (Number(results.MonthlyInstalmentsDuringPersonalFinancingPeriod) * Number(results.TenorDuringPersonalFinancingPeriodMonths)) +
        (Number(results.MonthlyInstalmentsAfterPersonalFinancingMatures) * Number(results.TenorAfterPersonalFinancingMonths)) +
        (Number(results.MonthlyInstalmentsAfterRetirement) * Number(results.TenorAfterRetirementMonths))
    );
}

export function getJob(job, t) {
    switch (job) {
        case "CIVILIAN":
            return t('job_fields.civilian');

        case 'MILITARY':
            return t('job_fields.military');

        case 'PRIVATE':
            return t('job_fields.private');

        case 'RETIREE':
            return t('job_fields.retiree');

        default:
            return "Incorrect job";
    }
}

export function getRank(rank, t) {
    switch (rank) {

        case "PRIVATE":
            return t('military_ranks.private');

        case 'CORPORAL':
            return t('military_ranks.corporal');

        case 'VICE_SERGEANT':
            return t('military_ranks.vice_sergeant');

        case 'SERGEANT':
            return t('military_ranks.sergeant');

        case 'FIRST_CLASS_SERGEANT':
            return t('military_ranks.first_class_sergeant');

        case 'MASTER_SERGEANT':
            return t('military_ranks.master_sergeant');

        case 'LIEUTENANT':
            return t('military_ranks.lieutenant');

        case 'CAPTAIN':
            return t('military_ranks.captain');

        case 'MAJOR':
            return t('military_ranks.major');

        case 'LIEUTENANT_COLONEL':
            return t('military_ranks.lieutenant_colonel');

        case 'COLONEL':
            return t('military_ranks.colonel');

        case 'BRIGADIER_GENERAL':
            return t('military_ranks.brigadier_general');

        case 'GENERAL':
            return t('military_ranks.general');

        default:
            return 'Incorrect rank'
    }
}