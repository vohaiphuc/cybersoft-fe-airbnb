/**
 * Chứa các hàm js:
 * - Không được thư viện hỗ trợ
 * - Không phải custom hook
 * - Tái sử dụng ở nhiều component
 */

import { format } from "date-fns";

export const dateFromIsoString = (date) => {
  const originalDate = new Date(date);
  return originalDate.toISOString();
};

export const formattedDate = (date) => {
  const originalDate = new Date(date);
  return format(originalDate, "dd-MM-yyyy");
};

export const truncateWords = (sentence, amount) => {
  const words = sentence ? sentence?.split(" ") : sentence;

  if (amount >= words.length) {
    return sentence;
  }

  const truncated = words.slice(0, amount);
  return `${truncated.join(" ")}...`;
};
