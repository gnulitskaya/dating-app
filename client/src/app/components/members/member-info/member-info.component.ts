import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../../models/member';
import { DictionaryService } from '../../../services/dictionary.service';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.scss']
})
export class MemberInfoComponent implements OnInit {
  @Input() member!: Member;
  constructor(public dic: DictionaryService) { }

  ngOnInit() {
  }

}
