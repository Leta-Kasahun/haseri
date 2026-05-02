const hasUpper = (value: string) => /[A-Z]/.test(value);
const hasLower = (value: string) => /[a-z]/.test(value);
const hasNumber = (value: string) => /[0-9]/.test(value);
const hasSpecial = (value: string) => /[!@#$%^&*(),.?":{}|<>]/.test(value);

export const getPasswordStrength = (value: string) => {
  const lengthScore = value.length >= 8 ? 1 : 0;
  const score =
    lengthScore +
    (hasUpper(value) ? 1 : 0) +
    (hasLower(value) ? 1 : 0) +
    (hasNumber(value) ? 1 : 0) +
    (hasSpecial(value) ? 1 : 0);

  const percent = Math.min(100, Math.round((score / 5) * 100));
  const label = score >= 5 ? "Strong" : score >= 3 ? "Medium" : "Weak";
  const labelClass = score >= 5 ? "text-emerald-600" : score >= 3 ? "text-amber-600" : "text-red-600";

  return { score, percent, label, labelClass };
};
