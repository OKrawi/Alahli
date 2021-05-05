import moment from 'moment-hijri'

export function getEpochDate(orderedDate, isHijriDate) {
    if (!isHijriDate)
      return (new Date(moment(orderedDate, 'DD/MM/YYYY').format('MM/DD/YYYY'))).valueOf().toString();
    else if (isHijriDate)
      return (new Date(moment(orderedDate, 'iDD/iMM/iYYYY').format('MM/DD/YYYY'))).valueOf().toString();
  }