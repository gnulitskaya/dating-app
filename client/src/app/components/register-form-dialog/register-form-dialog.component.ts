import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { User } from '../login-form-dialog/login-form-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-form-dialog',
  templateUrl: './register-form-dialog.component.html',
  styleUrl: './register-form-dialog.component.scss'
})
export class RegisterFormDialogComponent {
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

  constructor(private accountService: AccountService, private _snackBar: MatSnackBar,
    private _toastr: ToastrService) { }

  register() {
    if (this.form.invalid) { return }

    this.submitted = true

    const user: User = {
      username: this.form.value.userName,
      password: this.form.value.password
    }
    this.accountService.register(user).subscribe(res => {
      this._toastr.success('Вы зарегистрированы!');
    }, (err) => {
      this.submitted = false;
      this._toastr.error('Неверные данные!', err.error);
    })

  }
}
