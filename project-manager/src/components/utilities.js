export function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // check if the email matches the pattern
  return emailPattern.test(email);
}

