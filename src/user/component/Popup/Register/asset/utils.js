export const validatePhoneNumber = (_, value) => {
  const phonePattern = /^[0-9]{10}$/;

  if (!value) {
    return Promise.reject("Please input your phone number!");
  }

  if (!phonePattern.test(value)) {
    return Promise.reject("Please enter a valid phone number!");
  }

  return Promise.resolve();
};
