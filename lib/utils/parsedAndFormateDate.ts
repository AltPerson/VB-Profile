import { LanguageEnum } from '@/types/enums';
import { differenceInMonths, differenceInYears, format } from 'date-fns';
import { uk, enUS } from 'date-fns/locale';

export interface DateObject {
  year: number;
  month: number;
}

export interface DateValues {
  startDate: DateObject;
  endDate?: DateObject;
}

const dateLocalizationMap = {
  ua: {
    todayEmptyDate: 'На тепершній час',
    years: 'років',
    months: 'місяців',
    formatDate: (date: Date): string => {
      let formattedDate = format(date, DATE_MONTH_YEAR_TEMPLATE, {
        locale: uk,
      });

      formattedDate = formattedDate.replace('.', '');
      formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

      return formattedDate;
    },
  },
  en: {
    todayEmptyDate: 'Present',
    years: 'yr',
    months: 'mos',
    locale: enUS,
    formatDate: (date: Date): string =>
      format(date, DATE_MONTH_YEAR_TEMPLATE, {
        locale: enUS,
      }),
  },
};

const DATE_MONTH_YEAR_TEMPLATE = 'MMM yyyy';

export const parsedAndFormateDate = (term: DateValues, language: LanguageEnum) => {
  const { startDate, endDate } = term;

  const dateLocalizationValues = dateLocalizationMap[language];

  const startDateParsed = new Date(startDate.year, startDate.month);

  const formattedStartDate = dateLocalizationValues.formatDate(startDateParsed);

  let formattedEndDate = dateLocalizationValues.todayEmptyDate;

  let yearsDifference = differenceInYears(new Date(), new Date(startDateParsed));

  let monthsDifference = differenceInMonths(new Date(), new Date(startDateParsed)) % 12;

  if (endDate) {
    const endDateParsed = new Date(endDate.year, endDate.month);

    yearsDifference = differenceInYears(new Date(endDateParsed), new Date(startDateParsed));

    monthsDifference = differenceInMonths(new Date(endDateParsed), new Date(startDateParsed)) % 12;

    formattedEndDate = dateLocalizationValues.formatDate(endDateParsed);
  }

  return `${formattedStartDate} - ${formattedEndDate} · ${
    yearsDifference > 0 ? `${yearsDifference} ${dateLocalizationValues.years}` : ''
  } ${monthsDifference > 0 ? `${monthsDifference} ${dateLocalizationValues.months}` : ''}`;
};
