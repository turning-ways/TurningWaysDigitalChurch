import Color from "color";

export const roles = ["admin"];

export const hearAboutUs = ["facebook", "instagram", "linkedin"];

export const action = [
  "Undefined",
  "Invite for service",
  "Invite to Membership class",
  "Invite to Bible school",
  "Recommend for prayers",
  "Other actions required"
];


export const labels = [
  "Will attend service",
  "Unreachable",
];

export const getDarkerShade = (color: string, amount: number = 0.2): string => {
  return Color(color).darken(amount).hex();
};

export const capitalizeFirstLetters = (str: string): string => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};