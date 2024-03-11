import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormDialogComponent } from '../login-form-dialog/login-form-dialog.component';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  constructor(public dialog: MatDialog, private _accountService: AccountService,) { }

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
}
