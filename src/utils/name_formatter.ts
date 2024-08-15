export const NameFormatter = (
  firstName: string | undefined,
  lastName: string | undefined
) => {
  if (firstName && lastName) {
    return `${nameCapitalizer(firstName)} ${nameCapitalizer(lastName)}`;
  } else if (firstName && !lastName) {
    return nameCapitalizer(firstName);
  } else if (!firstName && lastName) {
    return nameCapitalizer(lastName);
  } else {
    return "Unknown";
  }
};

const nameCapitalizer = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

const firstNameCapitalizer = (name: string) => {
  return name?.charAt(0)?.toUpperCase();
};

export const ProfileNameFormatter = (firstName: string, lastName: string) => {
  if (firstName && lastName) {
    return `${firstNameCapitalizer(firstName)} ${firstNameCapitalizer(
      lastName
    )}`;
  } else if (firstName && !lastName) {
    return firstNameCapitalizer(firstName);
  } else if (!firstName && lastName) {
    return firstNameCapitalizer(lastName);
  } else {
    return "Unknown";
  }
};
