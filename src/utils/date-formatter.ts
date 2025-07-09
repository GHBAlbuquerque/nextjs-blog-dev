import { format, formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

export function dateFormatter(rawDate: string): string {
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

  return formattedDate;
}
