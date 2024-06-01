import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../../models/member';
import { MembersService } from '../../../services/members.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { ConfettiService } from '../../../services/confetti.service';
import { PresenceService } from '../../../services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {
  @Input() member!: Member;
  
  constructor(private memberService: MembersService, 
    private snackbarService: SnackbarService,
    private confettiService: ConfettiService,
    public presence: PresenceService) { }

  ngOnInit() {
  }

  addLike(member: Member) {
    this.memberService.addLike(member.username).subscribe(() => {
      this.confettiService.canon();
      this.snackbarService.openSnackBar('You liked this member', '');
    })
  }

}
