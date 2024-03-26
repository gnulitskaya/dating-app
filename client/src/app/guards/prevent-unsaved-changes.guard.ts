import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditComponent } from '../components/members/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {

  // private confirmService: ConfirmService
  constructor() {}

  canDeactivate(component: MemberEditComponent): Observable<boolean> | boolean {
    if (component.form.dirty) {
      // return this.confirmService.confirm()
      return confirm('You have unsaved changes, are you sure you want to leave?');
    }
    return true;
  }

}