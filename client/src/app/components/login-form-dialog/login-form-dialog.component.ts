import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';

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
    private _toastr: ToastrService
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
      console.log('%cLogin',
        'color: blue; font-size: 16px; font-weight: bold; background-color: white',
        res);
      this._toastr.success('Вы вошли!');
      this.submitted = false;
    }, (err) => {
      this.submitted = false;
      this._toastr.error('Неверные данные!', err.error);
    })
  }
}
