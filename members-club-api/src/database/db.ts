import { err, ok, Result } from 'neverthrow';
import { v4 } from 'uuid';
import { Member } from './Member';

const members: Member[] = []

const getMembers = () => members

const addMember = (email: string, name: string): Result<Member, DbError[]> => {
    const errors: DbError[] = []

    email = email?.trim()
    name = name?.trim()

    if (!email) {
        errors.push(DbError.EmptyEmail)
    }
    if (!name) {
        errors.push(DbError.EmptyName)
    }

    const existingMember = members.find(m => m.email === email)
    if (existingMember) {
        errors.push(DbError.EmailExists)
    }

    if (!validateEmail(email)) {
        errors.push(DbError.InvalidEmail)
    }
    if (!validateName(name)) {
        errors.push(DbError.InvalidName)
    }

    if (errors.length) {
        return err(errors)
    }

    const member: Member = {
        id: v4(),
        email: email,
        name: name,
        registrationDate: new Date()
    }
    members.push(member)
    return ok(member)
}

const validateEmail = (email: string) => email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

const validateName = (name: string) => name.toLowerCase().match(/^[a-z .]+$/)

export enum DbError {
    EmailExists = 'Email is already taken.',
    EmptyEmail = 'Email is empty',
    EmptyName = 'Name is empty',
    InvalidEmail = 'Email has invalid format.',
    InvalidName = 'Name has invalid format.'
}

export const db = {
    getMembers,
    addMember
}