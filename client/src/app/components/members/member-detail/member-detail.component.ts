import { Component } from '@angular/core';
import { Member } from '../../../models/member';
import { MembersService } from '../../../services/members.service';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem } from '@daelmaak/ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.scss'
})
export class MemberDetailComponent {
  member!: Member;
  images: GalleryItem[] = []

  constructor(private memberService: MembersService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadMember();
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

  loadMember() {  
    let username = this.route.snapshot.paramMap.get('username');
    this.memberService.getMember(username ?? '').subscribe(
      (member: Member) => {
        this.member = member;

        this.images = this.getImages();
      }
    )
  }

  selectTab(id: number) {}
}
