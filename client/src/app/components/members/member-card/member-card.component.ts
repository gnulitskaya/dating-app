import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../../models/member';
import { MembersService } from '../../../services/members.service';
import { PresenceService } from '../../../services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {
  @Input() member!: Member;
  
  constructor(public presence: PresenceService,
    private membersService: MembersService
  ) { }

  ngOnInit() {
  }

  addLike(member: Member) {
    this.membersService.addLike(member.username).subscribe();
  }

}
