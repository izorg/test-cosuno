import {
  Alert,
  Button,
  CircularProgress,
  Container,
  FormControl,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAsyncFn, useDebounce, useIntersection } from "react-use";

import { initializeApollo } from "../apollo/client";
import schemaLink from "../apollo/schemaLink";
import CompanyCard from "../components/CompanyCard";
import Header from "../components/Header";
import NameTextField from "../components/NameTextField";
import SpecialityChip from "../components/SpecialityChip";
import getFilter from "../lib/getFilter";
import { Speciality } from "../schema.generated";

import {
  CompaniesDocument,
  type CompaniesQuery,
  type CompaniesQueryVariables,
  useCompaniesQuery,
} from "./Companies.generated";

const HomePage = () => {
  const router = useRouter();

  const companyFilter = getFilter(router.query);

  const {
    previousData,
    data = previousData,
    error,
    fetchMore,
    loading,
  } = useCompaniesQuery({
    variables: {
      filter: companyFilter,
    },
  });

  const [nameValue, setNameValue] = useState(companyFilter.name || "");

  useDebounce(
    () => {
      void router.push(
        {
          query: {
            ...router.query,
            name: nameValue,
          },
        },
        undefined,
        /*
         * We prerender initial page, after that all filtering happens on client side
         * as we have no server caching for now but have a cache on the client.
         *
         * Imagine we do not use this option. It means on server side we have to do
         * all requests needed to render the page.
         */
        { shallow: true }
      );
    },
    300,
    [nameValue]
  );

  const [lastElement, setLastElement] = useState<HTMLElement | null>(null);

  const intersection = useIntersection(
    { current: lastElement },
    {
      root: null,
      rootMargin: "1000px",
      threshold: 1,
    }
  );

  const [more, doFetchMore] = useAsyncFn(
    (after: string) =>
      fetchMore({
        variables: {
          after,
        },
      }),
    [fetchMore]
  );

  const hasNextPage = data?.companies.pageInfo.hasNextPage;
  const endCursor = data?.companies.pageInfo.endCursor;

  const hasMore =
    !more.loading &&
    !more.error &&
    hasNextPage &&
    intersection &&
    intersection.intersectionRatio > 0;

  useEffect(() => {
    if (hasMore && endCursor) {
      void doFetchMore(endCursor);
    }
  }, [doFetchMore, endCursor, hasMore]);

  const companyEdges = data?.companies.edges;

  return (
    <>
      <Head>
        <title>Cosuno</title>
      </Head>
      <Header>
        <Container maxWidth="md">
          <form>
            <NameTextField
              onChange={(e) => setNameValue(e.target.value)}
              value={nameValue}
            />
            <FormControl
              margin="normal"
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {Object.values<Speciality>(Speciality).map((speciality) => {
                const selected = Boolean(
                  companyFilter.specialities?.includes(speciality)
                );

                return (
                  <SpecialityChip
                    key={speciality}
                    color={selected ? "primary" : "default"}
                    onClick={() => {
                      const specialities = companyFilter.specialities ?? [];

                      void router.push(
                        {
                          query: {
                            ...router.query,
                            specialities: selected
                              ? specialities.filter((s) => s !== speciality)
                              : [...specialities, speciality],
                          },
                        },
                        undefined,
                        { shallow: true }
                      );
                    }}
                    speciality={speciality}
                  />
                );
              })}
            </FormControl>
          </form>
        </Container>
        <LinearProgress sx={{ visibility: loading ? "visible" : "hidden" }} />
      </Header>
      <Container maxWidth="md" sx={{ paddingTop: 2 }}>
        {error ? (
          <Alert severity="error">Oops, something went wrong</Alert>
        ) : !companyEdges?.length ? (
          <Typography align="center" variant="h5">
            Nothing found
          </Typography>
        ) : (
          <Stack
            component="main"
            direction="column"
            spacing={2}
            sx={{ paddingBottom: 2 }}
          >
            {companyEdges.map(({ node: company }, index) => (
              <CompanyCard
                key={company.id}
                ref={
                  index === companyEdges.length - 1 ? setLastElement : undefined
                }
                company={company}
                selectedSpecialities={companyFilter.specialities || []}
              />
            ))}
            {more.loading && <CircularProgress sx={{ alignSelf: "center" }} />}
            {more.error && endCursor && (
              <Alert
                action={
                  <Button
                    color="inherit"
                    onClick={() => {
                      void doFetchMore(endCursor);
                    }}
                    size="small"
                  >
                    Retry
                  </Button>
                }
                severity="error"
              >
                Oops, something went wrong
              </Alert>
            )}
          </Stack>
        )}
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = initializeApollo(schemaLink);

  await client.query<CompaniesQuery, CompaniesQueryVariables>({
    query: CompaniesDocument,
    variables: {
      filter: getFilter(context.query),
    },
  });

  return {
    props: {
      initialApolloState: client.cache.extract(),
    },
  };
};

export default HomePage;
