import { months } from "./months";

export const getItemMonth = (date: Date): string => {
  const monthNumber = new Date(date).getMonth();
  const month = months.find((_, index) => index === monthNumber);

  if (!month) {
    throw new Error("Cannot find the item month");
  }
  return month.shortName;
};
