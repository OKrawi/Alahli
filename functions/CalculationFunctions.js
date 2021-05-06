import HijrahDate from 'hijrah-date';

function getDMY(date) {
  const d = date.slice(0, 2);
  const m = Number(date.slice(3, 5)) - 1;
  const y = date.slice(6, 10);
  return { d, m, y };
}

export function getEpochDate(orderedDate, isHijriDate) {
  const { d, m, y } = getDMY(orderedDate);

  if (!isHijriDate)
    return (new Date(y, m, d)).valueOf().toString();

  let epochDate;
  try {
    epochDate = getEpochDate(getGregorianFromHijri(orderedDate), false);
  } catch (e) {
    return "ERROR";
  }

  return epochDate;
}

export function getHijriFromGregorian(date) {
  const { d, m, y } = getDMY(date);

  const hijriDate = new HijrahDate(new Date(y, m, d));
  return getOrderedDate(hijriDate);
}

export function getOrderedDate(date) {
  const d = ("0" + String(date.getDate())).slice(-2);
  const m = ("0" + String(date.getMonth() + 1)).slice(-2);
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

export function getGregorianFromHijri(date) {
  const { d, m, y } = getDMY(date);

  const gregorianDate = new HijrahDate(y, m, d).toGregorian();
  return getOrderedDate(gregorianDate, true);
}