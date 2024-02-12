import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { API_BASE_URL } from '../constants/api'

const httpLink = createHttpLink({
  uri: API_BASE_URL
})

const authLink = (token: string) =>
  setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

export const getApolloClient = (token: string) => {
  return new ApolloClient({
    link: authLink(token).concat(httpLink),
    cache: new InMemoryCache()
  })
}
