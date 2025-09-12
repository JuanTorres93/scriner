// funtion to format date using date-fns
import { format } from "date-fns";

export function formatDate(date) {
  return format(new Date(date), "MMMM dd, yyyy");
}
