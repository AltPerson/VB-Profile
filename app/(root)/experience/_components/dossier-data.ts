import { IWorkPlace } from '@/constants/portfolio-data';
import { parsedAndFormateDate } from '@/lib/utils/parsedAndFormateDate';

export function createCareerRecords(workPlaces: readonly IWorkPlace[]) {
  return workPlaces.map((source, index) => {
    const separator = source.title.lastIndexOf(' - ');
    const [period, duration] = parsedAndFormateDate(source.term).formattedTerm.split(' · ');
    return {
      source,
      index,
      company: separator < 0 ? source.title : source.title.slice(0, separator),
      role: separator < 0 ? '' : source.title.slice(separator + 3),
      period,
      duration,
      current: !source.term.endDate,
    };
  });
}
export type CareerRecord = ReturnType<typeof createCareerRecords>[number];
export const recordNumber = (index: number) => String(index + 1).padStart(2, '0');
