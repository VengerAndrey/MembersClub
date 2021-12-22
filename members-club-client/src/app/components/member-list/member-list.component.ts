import { Member } from './../../graphql/types/Member';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { NewMemberGQL } from '../../graphql/NewMemberGQL';
import { MembersGQL, MembersResponse } from '../../graphql/MembersGQL';
import { handleErrors } from '../../common/error-handling';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit, OnDestroy {
  members: Member[] = []
  loading: boolean = false

  private membersQuery: QueryRef<any>
  private membersSubscription: Subscription = new Subscription

  constructor(membersGQL: MembersGQL, private newMemberGQL: NewMemberGQL) { 
    this.membersQuery = membersGQL.watch()
  }

  ngOnInit(): void {
    const newMemberGQLDocument = this.newMemberGQL.document
    this.membersQuery.subscribeToMore({
      document: newMemberGQLDocument,
      updateQuery: (previous: MembersResponse, { subscriptionData }) => {
        this.members = [...previous.members, subscriptionData.data.newMember as Member]
        return {
          ...previous,
          members: this.members
        }
      }
    })

    this.membersSubscription = this.membersQuery.valueChanges.subscribe(
      ({data} : {data: MembersResponse}) => {
        this.loading = false
        this.members = data.members
      },
      (error) => handleErrors(error)
    )

    this.updateMembers()
  }

  ngOnDestroy(): void {
    this.membersSubscription.unsubscribe()
  }

  updateMembers() {
    this.loading = true
    this.membersQuery.refetch()
  }
}
