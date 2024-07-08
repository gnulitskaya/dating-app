import { Component, Host, HostListener, OnInit } from '@angular/core';
import { Member } from '../../../models/member';
import { User } from '../../../models/user.model';
import { AccountService } from '../../../services/account.service';
import { MembersService } from '../../../services/members.service';
import { take } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.scss'
})
export class MemberEditComponent implements OnInit {
  member!: Member;
  user!: User;

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    if (this.form.dirty) {
      event.returnValue = true;
    }
  }

  form: FormGroup = new FormGroup({
    description: new FormControl(null, [
      Validators.required,
    ]),
    lookingFor: new FormControl(null, [
      Validators.required,
    ]),
    interests: new FormControl(null, [
      Validators.required,
    ]),
    city: new FormControl(null, [
      Validators.required,
    ]),
    country: new FormControl(null, [
      Validators.required,
    ]),
  });

  constructor(private accountService: AccountService, 
    private memberService: MembersService,
    public snackbarService: SnackbarService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      if (user) {
        this.user = user
      }
    });
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    console.log(this.user.username);

    this.memberService.getMember(this.user.username).subscribe(
      (member: Member) => {
        console.log(member);

        this.member = member;
      }
    )
  }

  updateMember() {
    this.memberService.updateMember(this.member).subscribe(
      (member: Member) => {
        console.log(member);
        this.snackbarService.openSnackBar('Данные успешно обновлены!', '');
      }
    )
  }
}
