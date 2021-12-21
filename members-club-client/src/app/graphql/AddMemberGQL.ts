import { Injectable } from "@angular/core";
import { gql, Mutation } from "apollo-angular";
import { Member } from "./types/Member";

@Injectable({
    providedIn: 'root'
})
export class AddMemberGQL extends Mutation<Member> {
    document = gql`
        mutation AddMember($email: String, $name: String) {
            addMember(email: $email, name: $name) {
                id,
                email,
                name,
                registrationDate
            }
        }
    `
}