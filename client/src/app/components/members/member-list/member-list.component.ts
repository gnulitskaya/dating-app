import { Component, OnInit } from '@angular/core';
import { Member } from '../../../models/member';
import { MembersService } from '../../../services/members.service';
import { Observable, of } from 'rxjs';
import { Pagination } from '../../../models/pagination';
import { PageEvent } from '@angular/material/paginator';
import { UserParams } from '../../../models/userParams';
import { AccountService } from '../../../services/account.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent implements OnInit {
  members: Member[] | null = [];
  pagination!: Pagination;
  userParams!: UserParams;
  user!: User | null;
  // members$: Observable<Member[]> = of([]);

  constructor(private memberService: MembersService, private accountService: AccountService) {
    this.accountService.currentUser$.subscribe(user => {
      if (user) {
        this.user = user;
        this.userParams = new UserParams(user);
      }
    })
  }

  ngOnInit(): void {
    this.loadMembers();
    // this.members$ = this.memberService.getMembers();
  }

  loadMembers() {
    // console.log(this.userParams);
    
    this.memberService.getMembers(this.userParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    });
  }

  onPageChange(event: PageEvent) {
    console.log(event);
    // this.pageNumber = event.pageIndex + 1;
    this.userParams.pageNumber = event.pageIndex + 1;

    this.loadMembers();
  }
}
