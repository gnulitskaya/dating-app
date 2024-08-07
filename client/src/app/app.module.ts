import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NavComponent } from './components/nav/nav.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormDialogComponent } from './components/login-form-dialog/login-form-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { RegisterFormDialogComponent } from './components/register-form-dialog/register-form-dialog.component';
import { ListsComponent } from './components/lists/lists.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { ToastrModule } from 'ngx-toastr';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberCardComponent } from './components/members/member-card/member-card.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { MatTabsModule } from '@angular/material/tabs';
import { MemberEditComponent } from './components/members/member-edit/member-edit.component';
import { SnackbarService } from './services/snackbar.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BusyService } from './services/busy.service';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { GalleryComponent } from '@daelmaak/ngx-gallery';
import { TestsComponent } from './components/tests/tests.component';
import { Test2Component } from './components/tests/test2/test2.component';
import { PostsService } from './components/tests/test2/posts.service';
import { Test3Component } from './components/tests/test3/test3.component';
import { PhotoEditorComponent } from './components/photo-editor/photo-editor.component';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextInputComponent } from './components/forms/text-input/text-input.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DateInputComponent } from './components/forms/date-input/date-input.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { ConfettiService } from './services/confetti.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MemberMessagesComponent } from './components/members/member-messages/member-messages.component';
import { AdminBarComponent } from './admin-bar/admin-bar.component';
import { HasRoleDirective } from './directives/has-role.directive';
import { UserManagementComponent } from './admin-bar/user-management/user-management.component';
import { PhotoManagementComponent } from './admin-bar/photo-management/photo-management.component';
import { UserRoleDialogComponent } from './admin-bar/user-role-dialog/user-role-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { GenderColorDirective } from './directives/gender-color.directive';
import { QuizProfileComponent } from './pages/quiz-profile/quiz-profile.component';
import { FormButtonToggleComponent } from './pages/quiz-profile/form-button-toggle/form-button-toggle.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DictionaryService } from './services/dictionary.service';
import {MatSliderModule} from '@angular/material/slider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { GetValueByNamePipe } from './pipes/get-value-by-name.pipe';
import { MemberInfoComponent } from './components/members/member-info/member-info.component';
import { GetColorByNamePipe } from './pipes/get-color-by-name.pipe';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AnimatedDogComponent } from './shared/animated-dog/animated-dog.component';
import { BreakpointsService } from './services/breakpoints.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/locale/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginFormDialogComponent,
    HomeComponent,
    RegisterFormDialogComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TextInputComponent,
    DateInputComponent,

    Test2Component,
    TestsComponent,
    Test3Component,
    MemberMessagesComponent,
    AdminBarComponent,
    HasRoleDirective,
    UserManagementComponent,
    PhotoManagementComponent,
    UserRoleDialogComponent,
    ConfirmDialogComponent,
    FooterComponent,
    GenderColorDirective,
    QuizProfileComponent,
    FormButtonToggleComponent,
    GetValueByNamePipe,
    MemberInfoComponent,
    GetColorByNamePipe,
    ContactsComponent,
    AnimatedDogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatTabsModule,
    NgxSpinnerModule,
    FileUploadModule,
    GalleryComponent,
    BrowserAnimationsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatProgressBarModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    SnackbarService,
    BusyService,
    PostsService,
    ConfettiService,
    DictionaryService,
    BreakpointsService,
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
