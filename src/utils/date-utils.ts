import { format, formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

export function formatDatetime(rawDate: string): string {
  const date = new Date(rawDate);
  const formattedDate = format(date, "dd/MM/yyyy 'at' HH:mm", {
    locale: enUS,
  });

  return formattedDate;
}

export function formatRelativeDate(rawDate: string): string {
  const date = new Date(rawDate);
  const formattedDate = formatDistanceToNow(date, {
    locale: enUS,
    addSuffix: false,
  });

  return `${formattedDate} ago`;
}

export function isOlderThanDays(rawDate: string, days: number): boolean {
  const date = new Date(rawDate);
  return (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24) > days;
}
