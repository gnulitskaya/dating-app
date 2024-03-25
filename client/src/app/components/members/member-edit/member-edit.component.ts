import { Component, OnInit } from '@angular/core';
import { Member } from '../../../models/member';
import { User } from '../../../models/user.model';
import { AccountService } from '../../../services/account.service';
import { MembersService } from '../../../services/members.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.scss'
})
export class MemberEditComponent implements OnInit {
  member!: Member;
  user!: User;

  constructor(private accountService: AccountService, private memberService: MembersService) {
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
}
