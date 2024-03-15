import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { ListsComponent } from './components/lists/lists.component';
import { MessagesComponent } from './components/messages/messages.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'members', component: MemberListComponent, canActivate: [authGuard]},
  {path: 'members/:id', component: MemberDetailComponent, canActivate: [authGuard]},
  {path: 'lists', component: ListsComponent, canActivate: [authGuard]},
  {path: 'messages', component: MessagesComponent, canActivate: [authGuard]},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
