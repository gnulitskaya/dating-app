import { Component, OnInit } from '@angular/core';
import { Member } from '../../../models/member';
import { MembersService } from '../../../services/members.service';
import { Pagination } from '../../../models/pagination';
import { PageEvent } from '@angular/material/paginator';
import { UserParams } from '../../../models/userParams';
import { User } from '../../../models/user.model';
import { TranslateService } from '@ngx-translate/core';

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
  genderList: any[] = [];
  cityList: any[] = [
    {value:'Москва', display: 'Москва'},
    {value:'Санкт-Петербург', display: 'Санкт-Петербург'},
  ];
  // members$: Observable<Member[]> = of([]);

  constructor(private memberService: MembersService,
    private translateService: TranslateService
  ) {
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
    this.initAndTranslateGender();
    // this.members$ = this.memberService.getMembers();
  }

  loadMembers() {
    console.log(this.userParams);
    
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

  initAndTranslateGender(): void {
    this.translateService.get('FILTER.MALE').subscribe((res: string) => {
      console.log(res);
      this.genderList.push(
        {value:'male', display: res},
      );
    });

    this.translateService.get('FILTER.FEMALE').subscribe((res: string) => {
      console.log(res);
      this.genderList.push(
        {value:'female', display: res},
      );
    });
  }
}
