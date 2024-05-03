import { Component, OnInit } from '@angular/core';
import { Member } from '../../models/member';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss'
})
export class ListsComponent implements OnInit {
  // members!: Partial<Member[]>;
  members: Member[] | null = [];
  predicate = 'liked';

  constructor(private memberService: MembersService) {

  }
  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes() {
    this.memberService.getLikes(this.predicate).subscribe((members: any) =>
      this.members = members
    );
  }
}
