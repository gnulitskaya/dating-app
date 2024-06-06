import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditComponent } from '../components/members/member-edit/member-edit.component';
import { DialogService } from '../services/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {

  constructor(private dialogService: DialogService) {}

  canDeactivate(component: MemberEditComponent): Observable<boolean> | boolean {
    if (component.form.dirty) {
      return this.dialogService.openDialog('You have unsaved changes, are you sure you want to leave?')
      // return confirm('You have unsaved changes, are you sure you want to leave?');
    }
    return true;
  }

}