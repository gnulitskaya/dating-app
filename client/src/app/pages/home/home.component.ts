import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterFormDialogComponent } from '../../components/register-form-dialog/register-form-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  registerMode = false;

  constructor(public dialog: MatDialog,) {}

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  openDialog() {
    this.dialog.open(RegisterFormDialogComponent, {
      width: '500px',
      height: '600px',
      // data: {
      //   animal: 'panda',
      // },
    });
  }
}
