import { ApolloServerPlugin, GraphQLRequestContext, GraphQLRequestListener, GraphQLServiceContext } from 'apollo-server-plugin-base';
import { query, mutation, unknown } from './config';

const graphQLRequestListener: GraphQLRequestListener = {
  async didResolveSource(context: GraphQLRequestContext) { },
  async parsingDidStart(context: GraphQLRequestContext) { },
  async validationDidStart(context: GraphQLRequestContext) { },
  async didResolveOperation(context: GraphQLRequestContext) { },
  async didEncounterErrors(context: GraphQLRequestContext) { },
  async responseForOperation(context: GraphQLRequestContext) { return null },
  async executionDidStart(context: GraphQLRequestContext) { },
  async willSendResponse(context: GraphQLRequestContext) {
    const request = (context.request.query?.trim())
    if (!request) {
      unknown.warn('Unable to parse request.')
    }
    else {
      let log = '\n' + request + '\n'
      const operationType = request.substring(0, request.indexOf(' ')).toLowerCase()
      const operation = context.operationName ?? 'unknown'
      // be careful with secure data here, e.g. password
      const variables = JSON.stringify(context.request.variables, null, 2)
      const response = JSON.stringify(context.response?.data, null, 2)
      const errors = JSON.stringify(context.errors, null, 2)
      if (variables && variables != '{}') {
        log += 'variables ' + operation + '\n' + variables + '\n'
      }
      if (response) {
        log += 'response ' + operation + '\n' + response + '\n'
      }
      if (errors) {
        log += 'errors ' + operation + '\n' + errors + '\n'
      }
      log = log.trimEnd()
      if (operationType.includes('query')) {
        errors ? query.error(log, null) : query.info(log)
        
      }
      else if (operationType.includes('mutation')) {
        errors ? mutation.error(log, null) : mutation.info(log)
      }
    }
  }
}
  
export class Logger implements ApolloServerPlugin {
  public async serverWillStart(service: GraphQLServiceContext) { }

  public async requestDidStart(context: GraphQLRequestContext): Promise<GraphQLRequestListener | void> {
    return graphQLRequestListener
  }
}