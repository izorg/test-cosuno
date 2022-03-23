import type { ParsedUrlQuery } from "querystring";

import { type CompanyFilter, Speciality } from "../schema.generated";

const getFilter = (query: ParsedUrlQuery) => {
  const { name, specialities } = query;

  const filter: CompanyFilter = {};

  if (name && typeof name === "string") {
    filter.name = name;
  }

  if (specialities) {
    filter.specialities = Array.isArray(specialities)
      ? (specialities as Speciality[]) // a tradeoff for type safety, could be improved, but we need to add some logic to exclude invalid query options and handle error
      : [specialities as Speciality];
  }

  return filter;
};

export default getFilter;
