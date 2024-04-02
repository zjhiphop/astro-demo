import * as ApolloClients from '@apollo/client/core'
import * as prismic from '@prismicio/client'
import { onError } from "@apollo/client/link/error";
import { addPrismicPreviewHeaders, getLanguageBasedOnLocale } from './utils';

// Fill in your repository name
export const repositoryName = import.meta.env.PRISMIC_REPO_NAME

const { ApolloClient, HttpLink, InMemoryCache, from }  = ApolloClients
const routes = [
    // Update to match your website's URL structure
    { type: 'cases', path: '/cases' },
    { type: 'home', path: '/' },
]

export const prismicClient = prismic.createClient(repositoryName, {
  // If your repository is private, add an access token
  accessToken: '',

  // This defines how you will structure URL paths in your project.
  // Update the types to match the custom types in your project, and edit
  // the paths to match the routing in your project.
  //
  // If you are not using a router in your project, you can change this
  // to an empty array or remove the option entirely.
  routes
})

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

export const client = new ApolloClient({
    link: from([
        errorLink,
        new HttpLink({
            uri: prismic.getGraphQLEndpoint(repositoryName),
            fetch: prismicClient.graphQLFetch as typeof fetch,
            useGETForQueries: true,
        })
    ]),
    defaultOptions: {
        watchQuery: {
          fetchPolicy: "no-cache",
          errorPolicy: "ignore",
        },
        query: {
          fetchPolicy: "no-cache",
          errorPolicy: "all",
        },
    },
    cache: new InMemoryCache(),
})

export const queryPrismic = async ({
    query,
    variables,
    previewData,
    locale,
  }: any) => {
    const { loading, error, data } = await client.query({
      query,
      variables: { ...variables, lang: getLanguageBasedOnLocale(locale) },
      ...addPrismicPreviewHeaders(previewData),
    });
  
    return {
      loading,
      error,
      data,
    };
  };
  