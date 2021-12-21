import { Member } from './types/Member';
import { Injectable } from '@angular/core';
import { gql, Subscription } from 'apollo-angular';

export interface Response {
    newMember: Member
}

@Injectable({
    providedIn: 'root'
})
export class NewMemberGQL extends Subscription<Response> {
    document = gql`
        subscription Subscription {
            newMember {
                id
                email
                name
                registrationDate
            }
        }
    `
}