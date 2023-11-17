import { parse } from "date-fns";

export function parseDate(dateString) {
  // Check if dateString is defined
  if (!dateString) {
    return null;
  }

  // Remove time zone information in parentheses
  const preprocessedDateString = dateString.replace(/\s+\(.+?\)/, "");

  const possibleFormats = [
    "dd/M/yyyy",
    "dd-M-yyyy",
    "EEE, dd MMM yyyy HH:mm:ss", // Use EEE for abbreviated day of the week
    "yyyy-MM-dd'T'HH:mm:ss.SSSX",
    "MM/dd/yyyy, h:mm:ss a",
    "yyyy-MM-dd",
    "yyyy-MM-ddTHH:mm:ss",
    "MM/dd/yyyy HH:mm:ss",
  ];

  for (const format of possibleFormats) {
    try {
      const parsedDate = parse(preprocessedDateString, format, new Date());
      if (!isNaN(parsedDate.getTime())) {
        // Parsing successful
        return parsedDate;
      }
    } catch (error) {
      console.log(error);
      // Parsing failed with this format, try the next one
    }
  }

  return null; // Return null for invalid date
}
