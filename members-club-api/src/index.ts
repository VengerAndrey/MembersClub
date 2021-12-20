import { server } from './graphql/server';
import { platform } from './logging/config';

server.listen().then(({ url }) => platform.info(`Server is running at ${url}`))