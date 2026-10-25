import { DateValuesOneBased, parsedAndFormateDate } from './parsedAndFormateDate';

// Preserve Home's original policy: sum inclusive employment months, round down to half-years.
export function getExperienceYears(workPlaces: readonly { term: DateValuesOneBased }[]): number {
  const months = workPlaces.reduce(
    (total, workPlace) => total + parsedAndFormateDate(workPlace.term).experience,
    0,
  );
  return Math.floor((months / 12) * 2) / 2;
}

export function formatExperience(years: number): string {
  const number = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 1 }).format(years);
  return `${number}+ ${years === 1 ? 'year' : 'years'}`;
}
