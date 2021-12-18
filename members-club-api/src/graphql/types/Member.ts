import { extendType, nonNull, objectType, stringArg } from "nexus";

export const Member = objectType({
    name: 'Member',
    definition(t) {
        t.nonNull.string('id')
        t.nonNull.string('email')
        t.nonNull.string('name')
        t.nonNull.dateTime('registrationDate')
    }
})

export const MemberQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('members', {
            type: Member,
            resolve: (_root, _args, ctx) => {
                return ctx.getMembers()
            }
        })
    }
})

export const MemberMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('addMember', {
            type: Member,
            args: {
                email: stringArg(),
                name: stringArg()
            },
            resolve: (_root, args, ctx) => {
                const member = ctx.addMember(args.email ?? '', args.name ?? '')
                if (member.isOk()) {
                    return member.value
                }
                throw new Error(member.error)
            }
        })
    }
})