import { Injectable } from '@angular/core';
import {Query, gql} from 'apollo-angular';
import { Member } from './types/Member';

export interface Response {
    members: Member[]
}

@Injectable({
    providedIn: 'root'
})
export class MembersGQL extends Query<Response> {
    document = gql`
        query Members {
            members {
                id,
                email,
                name,
                registrationDate
            }
        }
    `
}