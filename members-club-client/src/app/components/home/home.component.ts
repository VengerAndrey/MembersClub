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

  async updateMembers() {
    this.members = await this.memberService.getAll()
  }

  async addMember(form: FormGroup) {
    this.isSubmitted = true
    if(form.valid) {
      (await this.memberService.addMember(form.value.email, form.value.name))
        .subscribe(async () => await this.updateMembers(), (error) => alert(error))
    }
  }

  onReset() {
    this.isSubmitted = false
  }
}
