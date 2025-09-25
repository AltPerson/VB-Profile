import { differenceInMonths, endOfMonth, format, startOfMonth } from 'date-fns';
import { enUS, uk } from 'date-fns/locale';

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

const DATE_UA = 'LLLL yyyy';
const DATE_EN = 'MMMM yyyy';

const i18n = {
  ua: {
    todayEmptyDate: 'До теперішнього часу',
    years: 'р',
    months: 'міс',
    formatDate: (d: Date) => {
      const s = format(d, DATE_UA, { locale: uk });
      return s.charAt(0).toUpperCase() + s.slice(1);
    },
  },
  en: {
    todayEmptyDate: 'Present',
    years: 'yr',
    months: 'mos',
    formatDate: (d: Date) => format(d, DATE_EN, { locale: enUS }),
  },
} as const;

export function parsedAndFormateDate(
  term: DateValuesOneBased,
  language: keyof typeof i18n,
  inclusive = true,
) {
  const L = i18n[language];
  const start = startOfMonth(toDateFromOneBased(term.startDate));
  const end = endOfMonth(term.endDate ? toDateFromOneBased(term.endDate) : new Date());

  const formattedStart = L.formatDate(start);
  const formattedEnd = term.endDate ? L.formatDate(end) : L.todayEmptyDate;

  const totalMonths = differenceInMonths(end, start) + (inclusive ? 1 : 0);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const duration = [
    years > 0 ? `${years} ${L.years}` : '',
    months > 0 ? `${months} ${L.months}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return {
    formattedTerm: `${formattedStart} - ${formattedEnd} · ${duration}`.trim(),
    experience: totalMonths,
  };
}
