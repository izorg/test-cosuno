import type { Company, Resolvers } from "../schema.generated";

import dataJson from "./data.json";

const data = dataJson as Company[];

const resolvers: Resolvers = {
  Query: {
    companies: (parent, args) => {
      const { after, filter, first } = args;

      let filteredData = data;

      if (filter && Object.keys(filter).length > 0) {
        const filterName = filter.name?.toLowerCase();
        const filterSpecialities = filter.specialities;

        filteredData = data.filter((company) => {
          const matchName = filterName
            ? company.name.toLowerCase().includes(filterName)
            : true;

          const matchSpecialities = filterSpecialities
            ? filterSpecialities.every((speciality) =>
                company.specialities.includes(speciality)
              )
            : true;

          return matchName && matchSpecialities;
        });

        if (filterName) {
          // Sort to put start matches first. Probably this is what user want to see first
          filteredData.sort((a, b) => {
            if (a.name.toLowerCase().startsWith(filterName)) {
              return -1;
            }

            if (b.name.toLowerCase().startsWith(filterName)) {
              return 1;
            }

            return 0;
          });
        }
      }

      const afterIndex = after
        ? filteredData.findIndex((company) => company.id === after)
        : -1;

      const paginatedData = filteredData.slice(
        afterIndex + 1,
        afterIndex + 1 + first
      );

      const paginatedCount = paginatedData.length;

      return {
        edges: paginatedData.map((node) => ({
          cursor: node.id,
          node,
        })),
        pageInfo: {
          endCursor: paginatedCount
            ? paginatedData[paginatedData.length - 1].id
            : null,
          hasNextPage:
            paginatedCount > 0 &&
            paginatedData[paginatedData.length - 1] !==
              filteredData[filteredData.length - 1],
          hasPreviousPage:
            paginatedCount > 0 && paginatedData[0] !== filteredData[0],
          startCursor: paginatedCount ? paginatedData[0].id : null,
        },
      };
    },
  },
};

export default resolvers;
