import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/Member';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  members: Member[] = []

  memberForm!: FormGroup
  isSubmitted: boolean = false

  constructor(private memberService: MemberService, private formBuilder: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    this.memberForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]]
    })
    await this.updateMembers()
  }

  async updateMembers(): Promise<void> {
    try {
      const response = await this.memberService.getAll()
      this.members = response.data.members
    } catch (e) {
      this.handleErrors(e)
    }
  }

  async addMember(form: FormGroup) {
    this.isSubmitted = true
    if(form.valid) {
      (await this.memberService.addMember(form.value.email, form.value.name))
        .subscribe(async () => await this.updateMembers(), this.handleErrors)
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
      gqlErrors.forEach((e: any) => message += e?.message + '\n')
      if (message) {
        alert('Some errors have occurred:\n' + message)
      }
    }
  }
}
