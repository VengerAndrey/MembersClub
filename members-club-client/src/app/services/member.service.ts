import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Member } from '../models/Member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private membersQuery: QueryRef<{members: Member[]}>

  private addMemberMutation = gql`
    mutation AddMember($email: String, $name: String) {
      addMember(email: $email, name: $name) {
        id,
        email,
        name,
        registrationDate
      }
    }`

  constructor(private apollo: Apollo) { 
    this.membersQuery = this.apollo.watchQuery({
      query: gql`query Members {
        members {
          id,
          email,
          name,
          registrationDate
        }
      }`
    })
  }

  async getAll(): Promise<Member[]> {
    const result = await this.membersQuery.refetch()
    return result.data.members
  }

  async addMember(email:string, name: string) {
    return this.apollo.mutate<Member>({
      mutation: this.addMemberMutation,
      variables: {
        email: email,
        name: name
      }
    })
  }
}
