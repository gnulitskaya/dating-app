import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormDialogComponent } from '../login-form-dialog/login-form-dialog.component';
import { AccountService } from '../../services/account.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  @Output() isOpen = new EventEmitter<boolean>();
  constructor(
    public translate: TranslateService,
    public dialog: MatDialog, private _accountService: AccountService,) { }

  openDialog() {
    this.dialog.open(LoginFormDialogComponent, {
      width: '300px',
      height: '400px',
      // data: {
      //   animal: 'panda',
      // },
    });
  }

  get isAuth() {
    return this._accountService.isAuth$;
  }

  logout() {
    this._accountService.logout();
  }

  openMenu(event: boolean): void  {
    this.isOpen.emit(event);
  }

  switchLanguage(lang: Event | any) {
    lang.preventDefault();
    // console.log(lang.target.value);
    if(lang.target !== null) 
      this.translate.use(lang.target.value);
  }
}
