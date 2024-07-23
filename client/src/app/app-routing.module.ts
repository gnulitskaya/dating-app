import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { ListsComponent } from './components/lists/lists.component';
import { MessagesComponent } from './components/messages/messages.component';
import { authGuard } from './guards/auth.guard';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberEditComponent } from './components/members/member-edit/member-edit.component';
import { PreventUnsavedChangesGuard } from './guards/prevent-unsaved-changes.guard';
import { MemberDetailResolver } from './resolvers/member-detail.resolver';
import { AdminBarComponent } from './admin-bar/admin-bar.component';
import { AdminGuard } from './guards/admin.guard';
import { HomeComponent } from './pages/home/home.component';
import { QuizProfileComponent } from './pages/quiz-profile/quiz-profile.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { MemberMessagesComponent } from './components/members/member-messages/member-messages.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'quiz', component: QuizProfileComponent },
  { path: 'contacts', component: ContactsComponent },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'members', component: MemberListComponent },
      { path: 'members/:username', component: MemberDetailComponent, resolve: {member: MemberDetailResolver} },
      { path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},
      { path: 'likes', component: ListsComponent },
      { path: 'messages-history', component: MessagesComponent },
      { path: 'messages/:name', component: MemberMessagesComponent },
      { path: 'admin', component: AdminBarComponent, canActivate: [AdminGuard]},
    ]
  },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
