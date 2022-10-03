import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/api/apolloClient";
import Layout from "../lib/components/Layout";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
      <Component {...pageProps} />
      </Layout>

    </ApolloProvider>
  );
}

export default MyApp;
