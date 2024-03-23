import { Component } from '@angular/core';
import { Member } from '../../../models/member';
import { MembersService } from '../../../services/members.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.scss'
})
export class MemberDetailComponent {
  member!: Member;

  constructor(private memberService: MembersService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadMember();
  }

  loadMember() {  
    let username = this.route.snapshot.paramMap.get('username');
    this.memberService.getMember(username ?? '').subscribe(
      (member: Member) => {
        this.member = member;
      }
    )
  }

  selectTab(id: number) {}
}
