import {
  sortService,
  translateService,
  translateServicesLogos,
} from "../containers/Filter/data";

export const sortedServiceTypes = (
  ServiceTypes: string[],
  categoryName: "Services" | "Facilities" | "Specials"
): string[] => {
  const result = ServiceTypes.filter(
    (item) => sortService[item] === categoryName
  ).map((item) => translateService[item]);
  return result;
};

export const sortedServiceTypesLogos = (
  ServiceTypes: string[],
  categoryName: "Services" | "Facilities" | "Specials"
): Array<{ descript: string; logo: string }> => {
  const result = ServiceTypes.filter(
    (item) => sortService[item] === categoryName
  ).map((item) => translateServicesLogos[item]);
  return result;
};

export const getCategory = (
  ServiceTypes: string[],
  categoryName: "Services" | "Facilities" | "Specials"
): string[] => {
  const result = ServiceTypes.filter(
    (item) => sortService[item] === categoryName
  );
  return result;
};
