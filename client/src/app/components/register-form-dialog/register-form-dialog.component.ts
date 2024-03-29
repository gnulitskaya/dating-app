import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { User } from '../login-form-dialog/login-form-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-form-dialog',
  templateUrl: './register-form-dialog.component.html',
  styleUrl: './register-form-dialog.component.scss'
})
export class RegisterFormDialogComponent implements OnInit {

  public registerForm: FormGroup = new FormGroup({});
  submitted = false;

  constructor(private accountService: AccountService, private _snackBar: MatSnackBar,
    private _toastr: ToastrService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.intitializeForm();
  }

  register() {
    if (this.registerForm && this.registerForm.invalid) { return }

    this.submitted = true;
    console.log(this.registerForm.value);

    // this.accountService.register(this.registerForm.value).subscribe(res => {
    //   this._toastr.success('Вы зарегистрированы!');
    // }, (err) => {
    //   this.submitted = false;
    //   this._toastr.error('Неверные данные!', err.error);
    // })

  }

  intitializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required,
      Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.get(matchTo)?.value 
        ? null : { isMatching: true };
    };
  }
  
  getControl(name: string) {
    return this.registerForm.get(name) as FormControl<any>;
  }
}
