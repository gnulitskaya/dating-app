import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '../../models/photo';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { MembersService } from '../../services/members.service';
import { switchMap, take, tap } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { User } from '../../models/user.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: any;
  user: User | null = null;
  public fileUploadControl = new FileUploadControl(undefined, 
    FileUploadValidators.filesLimit(1));

  constructor(private membersService: MembersService,
    private sanitizer: DomSanitizer,
    private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit() {
  }

  sendPhoto() {
    this.fileUploadControl.valueChanges.pipe(
      switchMap(photo => this.membersService.sendPhoto(photo[0])),
      tap((response: any) => {
        console.log(response);
        
        // const bytes = new Uint8Array(response.imageData);
        // const base64Data = btoa(String.fromCharCode(...bytes));

        // console.log('base64Data', response.imageData, bytes, base64Data);
        // const bytes = new Uint8Array(response.imageData);
        // let binary = '';
        // for (let i = 0; i < bytes.length; i++) {
        //     binary += String.fromCharCode(bytes[i]);
        // }
        // const base64Data = btoa(binary);
        // response.imageData = `data:image/png;base64,${base64Data}`;
        // console.log(base64Data);
        // console.log(this.arrayBufferToBase64(response.imageData));
        // const imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(new Blob(response.imageData, {type: "image/jpeg"})));
        // response.imageData = imageUrl;
        this.member.photos.push(response);

        if (response.isMain) {
          this.user!.photoUrl = response.url;
          this.member.photoUrl = response.url;
          if(this.user !== null)
          this.accountService.setCurrentUser(this.user);
        }
        // URL.revokeObjectURL(imageUrl);
      }),
    ).subscribe();
  }

  setMainPhoto(photo: Photo) {
    this.membersService.setMainPhoto(photo.id).subscribe(() => {
      this.user!.photoUrl = photo.url;
      this.user!.imageData = photo.imageData;
      if (this.user !== null) this.accountService.setCurrentUser(this.user);
      this.member.photoUrl = photo.url;
      this.member.imageData = photo.imageData;
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

  arrayBufferToBase64(buffer: any) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}
