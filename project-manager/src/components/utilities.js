export function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // check if the email matches the pattern
  return emailPattern.test(email);
}

export const removeDuplicates = (array) => {
  return array.filter((item, index) => {
    return index === array.findIndex(obj => JSON.stringify(obj) === JSON.stringify(item));
  });
};