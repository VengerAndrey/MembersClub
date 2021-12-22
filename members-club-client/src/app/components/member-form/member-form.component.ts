import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { handleErrors } from '../../common/error-handling';
import { AddMemberGQL } from '../../graphql/AddMemberGQL';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  memberForm!: FormGroup
  isSubmitted: boolean = false

  constructor(private formBuilder: FormBuilder, private addMemberGQL: AddMemberGQL) { }

  ngOnInit(): void {
    this.memberForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]]
    })
  }

  addMember(form: FormGroup) {
    this.isSubmitted = true
    if(form.valid) {
      this.addMemberGQL.mutate({
        email: form.value.email,
        name: form.value.name
      }).subscribe(
        () => {},
        (error) => handleErrors(error)
      )
    }
  }

  onReset() {
    this.isSubmitted = false
  }
}
