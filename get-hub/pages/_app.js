import '../styles/globals.scss'
import  { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '../pages/api/apolloClient'


function MyApp({ Component, pageProps }: AppProps) {



    return (
        <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}

export default MyApp