import { differenceInMonths, endOfMonth, format, startOfMonth } from 'date-fns';
import { enUS } from 'date-fns/locale';

export type MonthOneBased = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface DateObjectOneBased {
  year: number;
  month: MonthOneBased;
}

export interface DateValuesOneBased {
  startDate: DateObjectOneBased;
  endDate?: DateObjectOneBased;
}

export const toDateFromOneBased = ({ year, month }: DateObjectOneBased) =>
  new Date(year, month - 1, 1);

const DATE_EN = 'MMMM yyyy';

const formatDate = (date: Date) => format(date, DATE_EN, { locale: enUS });

export function parsedAndFormateDate(term: DateValuesOneBased, inclusive = true) {
  const start = startOfMonth(toDateFromOneBased(term.startDate));
  const end = endOfMonth(term.endDate ? toDateFromOneBased(term.endDate) : new Date());

  const formattedStart = formatDate(start);
  const formattedEnd = term.endDate ? formatDate(end) : 'Present';

  const totalMonths = differenceInMonths(end, start) + (inclusive ? 1 : 0);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const duration = [years > 0 ? `${years} yr` : '', months > 0 ? `${months} mos` : '']
    .filter(Boolean)
    .join(' ');

  return {
    formattedTerm: `${formattedStart} - ${formattedEnd} · ${duration}`.trim(),
    experience: totalMonths,
  };
}
