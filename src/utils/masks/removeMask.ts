export const removeMask = (value: string) => {
  const valueUnmasked = value
    .split(".")
    .join("")
    .split("R$")
    .join("")
    .split(",")
    .join(".");
  return Number(valueUnmasked);
};
