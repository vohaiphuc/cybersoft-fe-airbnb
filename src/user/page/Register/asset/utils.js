/**
 * Chứa các hàm js:
 * - Không được thư viện hỗ trợ
 * - Không phải custom hook
 * - Tái sử dụng ở nhiều component
 */
export const validatePhoneNumber = (_, value) => {
  // Phone number pattern (adjust as needed)
  const phonePattern = /^[0-9]{10}$/;

  if (!value) {
    return Promise.reject("Please input your phone number!");
  }

  if (!phonePattern.test(value)) {
    return Promise.reject("Please enter a valid phone number!");
  }

  return Promise.resolve();
};
