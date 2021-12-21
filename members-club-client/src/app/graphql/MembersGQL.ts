import { Injectable } from '@angular/core';
import {Query, gql} from 'apollo-angular';
import { Member } from './types/Member';

export interface MembersResponse {
    members: Member[]
}

@Injectable({
    providedIn: 'root'
})
export class MembersGQL extends Query<MembersResponse> {
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