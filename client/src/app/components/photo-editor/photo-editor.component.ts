import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '../../models/photo';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { MembersService } from '../../services/members.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: any;
  public fileUploadControl = new FileUploadControl(undefined, FileUploadValidators.filesLimit(1));

  constructor(private membersService: MembersService) { }

  ngOnInit() {
  }

  sendPhoto() {
    console.log(this.fileUploadControl.value[0]);

    this.fileUploadControl.valueChanges.pipe(
      switchMap(x => this.membersService.sendPhoto(x[0])),
      tap(response => {
        console.log(response);
        this.member.photos.push(response);

        // if (photo.isMain) {
        //   this.user.photoUrl = photo.url;
        //   this.member.photoUrl = photo.url;
        //   this.accountService.setCurrentUser(this.user);
        // }
      })
    ).subscribe();
  }

  setMainPhoto(photo: Photo) {
    // this.memberService.setMainPhoto(photo.id).subscribe(() => {
    //   this.user.photoUrl = photo.url;
    //   this.accountService.setCurrentUser(this.user);
    //   this.member.photoUrl = photo.url;
    //   this.member.photos.forEach(p => {
    //     if (p.isMain) p.isMain = false;
    //     if (p.id === photo.id) p.isMain = true;
    //   })
    // })
  }

  deletePhoto(photoId: number) {
    this.membersService.deletePhoto(photoId).subscribe(() => {
      this.member.photos = this.member.photos.filter((x: any) => x.id !== photoId);
    })
  }

}