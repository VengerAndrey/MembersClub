import { ApolloServer } from "apollo-server";
import { schema } from './schema';
import { createContext } from './context';
import { Logger } from '../logging/Logger';

export const server = new ApolloServer({ 
    schema, 
    context: createContext, 
    plugins: [new Logger()]
})
