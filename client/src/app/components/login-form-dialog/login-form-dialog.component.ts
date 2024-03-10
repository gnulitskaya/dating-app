import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../../services/account.service';

export interface User {
  username: string
  password: string
}

@Component({
  selector: 'app-login-form-dialog',
  templateUrl: './login-form-dialog.component.html',
  styleUrl: './login-form-dialog.component.scss'
})
export class LoginFormDialogComponent {
  form: FormGroup = new FormGroup({
    userName: new FormControl(null, [
      Validators.required,
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6)
    ]),
  });
  submitted = false;
  message: string = '';

  constructor(
    private _snackBar: MatSnackBar,
    private _accountService: AccountService,
  ) { }

  ngOnInit() {

  }

  submit() {
    if (this.form.invalid) { return }

    this.submitted = true

    const user: User = {
      username: this.form.value.userName,
      password: this.form.value.password
    }

    this._accountService.login(user).subscribe((res) => {
      // this.form.reset()
      // this.router.navigate(['/admin', 'dashboard'])
      console.log('%cLogin',
        'color: blue; font-size: 16px; font-weight: bold; background-color: white',
        res);
      this.openSnackBar('Вы вошли!', '');
      this.submitted = false;
      this._accountService.isAuth = true;
    }, () => {
      this.submitted = false;
      this._accountService.isAuth = false;
      this.openSnackBar('Неверные данные!', '');
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
