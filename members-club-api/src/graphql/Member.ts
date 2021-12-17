import { objectType } from "nexus";

export const Member = objectType({
    name: 'Member',
    definition(t) {
        t.nonNull.string('id')
    }
})