import { Directive, Input, OnInit, TemplateRef, ViewContainerRef, input } from '@angular/core';
import { AccountService } from '../services/account.service';
import { take } from 'rxjs';
import { User } from '../models/user.model';

@Directive({
  selector: '[appHasRole]' // *appHasRole
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole!: string[];
  user!: User;

  constructor(private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private accountService: AccountService
  ) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      if(user) this.user = user;
    })
  }
  ngOnInit(): void {
    if(!this.user?.roles || this.user == null) {
      this.viewContainerRef.clear();
      return;
    }

    if(this.user?.roles.some(role => this.appHasRole.includes(role))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

}
