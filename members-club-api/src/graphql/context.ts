import { Result } from 'neverthrow';
import { db, DbError } from '../database/db';
import { Member } from '../database/Member';

export interface Context {
    getMembers(): Member[],
    addMember(email: string, name: string): Result<Member, DbError>,
}

export const createContext = (): Context => db