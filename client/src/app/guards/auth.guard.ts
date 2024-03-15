import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('user');
  console.log(user);
  
  if(user) return true;
  inject(ToastrService).error('You shall not pass!');
  return false;
};
