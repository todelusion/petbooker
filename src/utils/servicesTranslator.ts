import { sortService, translateService } from "../containers/Filter/data";

/* eslint-disable import/prefer-default-export */
export const sortedServiceTypes = (
  ServiceTypes: string[],
  categoryName: "Services" | "Facilities" | "Specials"
): string[] => {
  const result = ServiceTypes.filter(
    (item) => sortService[item] === categoryName
  ).map((item) => translateService[item]);
  return result;
};
