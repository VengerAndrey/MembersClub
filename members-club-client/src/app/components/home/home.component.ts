import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MembersGQL } from '../../graphql/MembersGQL';
import { QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { AddMemberGQL } from '../../graphql/AddMemberGQL';
import { Member } from '../../graphql/types/Member';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  members: Member[] = []
  loading: boolean = false

  memberForm!: FormGroup
  isSubmitted: boolean = false

  private membersQuery: QueryRef<any>
  private membersSubscription: Subscription = new Subscription;

  constructor(private formBuilder: FormBuilder, 
    membersGQL: MembersGQL,
    private addMemberGQL: AddMemberGQL) { 
      this.membersQuery = membersGQL.watch()
  }

  ngOnInit() {
    this.memberForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]]
    })
    this.membersSubscription = this.membersQuery.valueChanges.subscribe(
      ({data}) => {
        this.loading = false
        this.members = data.members
      },
      (error) => this.handleErrors(error)
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

  addMember(form: FormGroup) {
    this.isSubmitted = true
    if(form.valid) {
      this.addMemberGQL.mutate({
        email: form.value.email,
        name: form.value.name
      }).subscribe(
        () => this.updateMembers(),
        (error) => this.handleErrors(error)
      )
    }
  }

  onReset() {
    this.isSubmitted = false
  }

  private handleErrors(errors: any): void {
    const networkError = errors?.networkError
    if (networkError) {
      alert('Remote service is not available.')
    }
    const gqlErrors =  errors?.graphQLErrors
    if (gqlErrors && gqlErrors.length) {
      let message = ''
      gqlErrors.forEach((e: any) => JSON.parse(e?.message ?? '[]').forEach((m: string) => message += m + '\n'))
      if (message) {
        alert('Some errors have occurred:\n' + message)
      }
    }
  }
}
