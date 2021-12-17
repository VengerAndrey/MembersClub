import {db} from './database/db';
import { Member } from './database/Member';

export interface Context {
    db: Member[]
}

export function createContext(): Context {
    return {
        db: db
    }
}