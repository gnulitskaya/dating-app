import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '../../models/photo';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { MembersService } from '../../services/members.service';
import { switchMap, take, tap } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: any;
  user: User | null = null;
  public fileUploadControl = new FileUploadControl(undefined, FileUploadValidators.filesLimit(1));

  constructor(private membersService: MembersService,
    private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit() {
  }

  sendPhoto() {
    console.log(this.fileUploadControl.value[0]);

    this.fileUploadControl.valueChanges.pipe(
      switchMap(x => this.membersService.sendPhoto(x[0])),
      tap((response: any) => {
        console.log(response);
        this.member.photos.push(response);

        // if (response.isMain) {
        //   this.user!.photoUrl = response.url;
        //   this.member.photoUrl = response.url;
        //   if(this.user !== null)
        //   this.accountService.setCurrentUser(this.user);
        // }
      })
    ).subscribe();
  }

  setMainPhoto(photo: Photo) {
    this.membersService.setMainPhoto(photo.id).subscribe(() => {
      this.user!.photoUrl = photo.url;
      if (this.user !== null) this.accountService.setCurrentUser(this.user);
      this.member.photoUrl = photo.url;
      this.member.photos.forEach((p: Photo) => {
        if (p.isMain) p.isMain = false;
        if (p.id === photo.id) p.isMain = true;
      })
    })
  }

  deletePhoto(photoId: number) {
    this.membersService.deletePhoto(photoId).subscribe(() => {
      this.member.photos = this.member.photos.filter((x: any) => x.id !== photoId);
    })
  }

}
