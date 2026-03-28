export function formatName(fullName: string) {
  const parts = fullName.trim().split(" ");

  if (parts.length === 1) return parts[0];

  const firstName = parts[0];
  const lastNameInitial = parts[1][0].toUpperCase();

  return `${firstName} ${lastNameInitial}.`;
}
