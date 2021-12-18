import path from 'path';
import { server } from './graphql/server';

server.listen().then(({ url }) => console.log(`Server is running at ${url}`))