import { Kind } from 'graphql';
import { scalarType } from 'nexus';

export const DateTime = scalarType({
    name: 'DateTime',
    asNexusMethod: 'dateTime',
    description: 'DateTime scalar',
    parseValue(value) {
      const date = new Date(value)
      return date.getTime()
    },
    serialize(value) {
      return new Date(value).getTime()
    },
    parseLiteral(node) {
      if (node.kind === Kind.INT) {
        return new Date(node.value)
      }
      return null
    }
  })