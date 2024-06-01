import { Component, OnDestroy } from '@angular/core';
import { Member } from '../../../models/member';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem } from '@daelmaak/ngx-gallery';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { PresenceService } from '../../../services/presence.service';
import { AccountService } from '../../../services/account.service';
import { User } from '../../../models/user.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.scss'
})
export class MemberDetailComponent implements OnDestroy {
  member!: Member;
  images: GalleryItem[] = [];
  selectedTab: number = 0;
  messages: Message[] = [];
  user!: User;

  constructor(
    public presence: PresenceService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private accountService: AccountService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
        if(user) this.user = user;
      });
    }

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
      this.messageService.createHubConnection(this.user, this.member.username);
    } else {
      this.messageService.stopHubConnection();
    }
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
}
