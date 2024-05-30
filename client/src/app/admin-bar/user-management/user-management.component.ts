import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { AdminService } from '../../services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { UserRoleDialogComponent } from '../user-role-dialog/user-role-dialog.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent {
  users!: Partial<User[]>;

  constructor(private adminService: AdminService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe(users => {
      this.users = users;
    })
  }

  openRolesModal(user: User) {
    let roles = this.getRolesArray(user);
    this.dialog.open(UserRoleDialogComponent, {
      width: '600px',
      height: '300px',
      data: {name: user.username, roles: roles},
    }).afterClosed().subscribe(result => {
      this.updateRoles(result, user);
    });
  }

  updateRoles(values: any[], user: User) {
    const rolesToUpdate = {
      roles: [...values.filter(el => el.checked === true).map(el => el.name)]
    };
    if (rolesToUpdate) {
      this.adminService.updateUserRoles(user.username, rolesToUpdate.roles).subscribe(() => {
        user.roles = [...rolesToUpdate.roles]
      })
    }
  }

  private getRolesArray(user: any) {
    const roles: any[] = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      {name: 'Admin', value: 'Admin'},
      {name: 'Moderator', value: 'Moderator'},
      {name: 'Member', value: 'Member'}
    ];

    availableRoles.forEach(role => {
      let isMatch = false;
      for (const userRole of userRoles) {
        if (role.name === userRole) {
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      }
      if (!isMatch) {
        role.checked = false;
        roles.push(role);
      }
    })

    console.log("🚀 ~ UserManagementComponent ~ getRolesArray ~ roles:", roles)
    return roles;
  }

}
