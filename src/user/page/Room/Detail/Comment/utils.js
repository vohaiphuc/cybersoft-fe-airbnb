import moment from "moment";

export const parseDateString = (dateString) => {
  // Check if the date string is already in 'DD/MM/YYYY' format
  const isAlreadyFormatted = moment(dateString, "DD/MM/YYYY", true).isValid();
  const isAlreadyFormattedNewValue = moment(
    dateString,
    "DD-MM-YYYY",
    true
  ).isValid();

  if (isAlreadyFormatted || isAlreadyFormattedNewValue) {
    // If already formatted, return the original date string
    return dateString;
  }

  // Parse the date string using Moment.js
  const parsedDate = moment(dateString);

  // Format the date as DD/MM/YYYY
  const formattedDate = parsedDate.format("DD/MM/YYYY");

  return formattedDate;
};

export function getCurrentDate() {
  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const year = currentDate.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}
