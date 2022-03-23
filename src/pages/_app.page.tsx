import { ApolloProvider, type NormalizedCacheObject } from "@apollo/client";
import { CacheProvider, type EmotionCache } from "@emotion/react";
import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import type { AppProps } from "next/app";

import { useApollo } from "../apollo/client";
import httpLink from "../apollo/httpLink";
import createEmotionCache from "../lib/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type CustomAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

const theme = responsiveFontSizes(createTheme());

const CustomApp = (props: CustomAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache } = props;

  const apolloClient = useApollo(
    httpLink,
    props.pageProps.initialApolloState as NormalizedCacheObject | undefined
  );

  return (
    <ApolloProvider client={apolloClient}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...props.pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </ApolloProvider>
  );
};

export default CustomApp;
