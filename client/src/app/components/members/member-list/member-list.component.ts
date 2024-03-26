import { Component, OnInit } from '@angular/core';
import { Member } from '../../../models/member';
import { MembersService } from '../../../services/members.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent implements OnInit {
  // members: Member[] = [];
  members$: Observable<Member[]> = of([]);

  constructor(private memberService: MembersService) {}

  ngOnInit(): void {
    // this.loadMembers();
    this.members$ = this.memberService.getMembers();
  }

  // loadMembers() {
  //   this.memberService.getMembers().subscribe(members => {
  //     this.members = members;
  //   });
  // }

}
