import { relayStylePagination } from "@apollo/client/utilities";

import { type StrictTypedTypePolicies } from "./helpers.generated";

const typePolicies: StrictTypedTypePolicies = {
  Query: {
    keyFields: false,
    fields: {
      // automated pagination handling thanks to Relay & Apollo
      companies: relayStylePagination(["filter"]),
    },
  },
};

export default typePolicies;
