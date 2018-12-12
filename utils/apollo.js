import { ApolloClient } from 'apollo-client'
import { apollo } from 'nuxt.config'

export default new ApolloClient(apollo.clientConfigs.default)
