# Cosuno Coding Challenge

Thank you for opportunity to participate in this coding challenge. You can find
many comments related to solution making in code itself and section [Developer Thoughts](#developer-thoughts).

## Setup

```shell
npm install
npm run codegen
```

## Development

```shell
npm run dev
```

By default, the application is running on [http://localhost:3000](http://localhost:3000).

Running in production environment:

```shell
npm run build
npm run start
```

## Test Data

Test data is included in the repository. But you can change it by running following command:

```shell
npm run generate-test-data
```

## Improvements

- Better mobile experience. I did responsive application but for vert small screens it could be not enough
  and requires additional effort.
- Server Side Cache setup. Right now for coding challenge purpose we have client side cache.
  Server caching strategy depends on many factors. But the first place for setup information
  would be Apollo Server docs https://www.apollographql.com/docs/apollo-server/performance/caching
- Tests setup. I am using TypeScript for this project, and it already covers me a lot. But tests are needed.
  I personally prefer starting from End-to-End tests as it has direct impact on business.
  If common user scenarios do not pass we loose money. Second wave of tests are unit test to
  cover shared code so other developer do not break the application during development/refactoring.
  Third wave of tests are Integration tests.
- Dockerize. Distributing the application as Docker container is a good practice. Especially
  when you have a lot of dependencies. Developer does not need to manually install all project
  dependencies.

## Developer Thoughts

`schema.graphql` file is a contract that affects the whole application. In this file we
could define data structures, endpoints and setup cache behavior. It is used by code generator
to provide types and helper functions for our TypeScript codebase.

I did not extract some functionality in separate files as for coding challenge it is an
over-engineering and harder to review. I appreciate your time.

Next.js is the best solution for Front+Back coding challenge as it provides both client and server
solutions out if the box. For large projects it makes sense to use separate backend service.
