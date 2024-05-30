import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user.model';

export interface DialogData {
  name: string;
  roles: {name: string; checked: boolean; value: string;}[];
}

@Component({
  selector: 'app-user-role-dialog',
  templateUrl: './user-role-dialog.component.html',
  styleUrl: './user-role-dialog.component.scss'
})
export class UserRoleDialogComponent {
  user!: User;
  
  constructor(public dialogRef: MatDialogRef<UserRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
  updateRoles() {}
}
