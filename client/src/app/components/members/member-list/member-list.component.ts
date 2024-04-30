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
  genderList = [{value:'male', display: 'Male'}, {value: 'female', display: 'Female'}];
  // members$: Observable<Member[]> = of([]);

  constructor(private memberService: MembersService) {
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
    // this.members$ = this.memberService.getMembers();
  }

  loadMembers() {
    // console.log(this.userParams);
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    });
  }

  onPageChange(event: PageEvent) {
    this.userParams.pageNumber = event.pageIndex + 1;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }

  resetFilters() {
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }
}
