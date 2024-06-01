import { Component } from '@angular/core';
import { Member } from '../../../models/member';
import { MembersService } from '../../../services/members.service';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem } from '@daelmaak/ngx-gallery';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { PresenceService } from '../../../services/presence.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.scss'
})
export class MemberDetailComponent {
  member!: Member;
  images: GalleryItem[] = [];
  selectedTab: number = 0;
  messages: Message[] = [];

  constructor(
    public presence: PresenceService,
    private route: ActivatedRoute,
    private messageService: MessageService) {}

  ngOnInit() {
    // this.loadMember();
    this.route.data.subscribe(data => {
      // console.log(data);
      this.member = data['member'];
    })

    this.route.queryParams?.subscribe((params: any) => {
      console.log(params);
      params['tab'] ? this.selectTab(params['tab']) : this.selectTab(0);
    });

    this.images = this.getImages();
  }

  getImages(): GalleryItem[] {
    const imageUrls = [];
    console.log(this.member);
    
    for (const photo of this.member.photos) {
      imageUrls.push({
        src: photo?.url,
      })
    }
    return imageUrls;
  }

  loadMessages() {
    this.messageService.getMessageThread(this.member.username).subscribe(messages => {
      this.messages = messages;
    });
  }

  selectTab(event: any) {
    console.log(event);
    this.selectedTab = event;
    if(this.selectedTab == 3 && this.messages.length === 0) {
      this.loadMessages();
    }
  }
}
