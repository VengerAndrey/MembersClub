import { ApolloServer } from 'apollo-server-express';
import { schema } from './schema';
import { createContext } from './context';
import { Logger } from '../logging/Logger';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import { platform } from '../logging/config';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

export const startApolloServer = async () => {
    const app = express()
    const httpServer = http.createServer(app)
    const subscriptionServer = SubscriptionServer.create(
        {
            schema,
            execute,
            subscribe
        },
        {
            server: httpServer,
            path: '/graphql'
        }
    )
    const server = new ApolloServer({ 
        schema, 
        context: createContext, 
        plugins: [
            new Logger(),
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            subscriptionServer.close()
                        }
                    }
                }
            }
        ],
        introspection: false
    })
    await server.start()
    server.applyMiddleware({
        app,
        path: '/graphql'
    })
    const port = 4000
    await new Promise<void>(resolve => httpServer.listen({ port }, resolve))
    platform.info(`Server is running at http://localhost:${port}${server.graphqlPath}`)
}
