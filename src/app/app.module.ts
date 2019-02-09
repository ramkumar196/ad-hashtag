import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule  } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http'; 
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';


import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'; 
import { FormsModule } from '@angular/forms'; 
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRippleModule} from '@angular/material/core';

import { ShareButtonsModule } from '@ngx-share/buttons';
import { NgxEditorModule } from 'ngx-editor';



import {NgbModule} from '@ng-bootstrap/ng-bootstrap';






import { AppComponent } from './app.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { RouterModule, Routes} from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './shared/frontend-layout/header/header.component';
import { FooterComponent } from './shared/frontend-layout/footer/footer.component';

import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';
import { JwtService } from './services/jwt.service';
import { AuthguardService } from './services/authguard.service';
import { BrowserLocation } from './services/browserlocation.service';
import { HashtagService } from './services/hashtag.service';
import { DialogService } from './services/dialog.service';
import { DialogInputService } from './services/dialoginput.service';
import { CommonService } from './services/common.service';
import { SharedService } from './services/shared.service';





//import { LoginLayoutModule } from './login-layout/login-layout.module';
import { LoginComponent } from './login/login.component';
import { PostAdComponent } from './post-ad/post-ad.component';

import { polyfill as keyboardEventKeyPolyfill } from 'keyboardevent-key-polyfill';
import { TextInputAutocompleteModule } from './modules/textarea-autocomplete/text-input-autocomplete.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { LoggedLayoutComponent } from './logged-layout/logged-layout.component';
import { AdListComponent } from './ad-list/ad-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SidebarComponent } from './shared/frontend-layout/sidebar/sidebar.component';
import { EditAdComponent } from './edit-ad/edit-ad.component';
import { ViewAdComponent } from './view-ad/view-ad.component';
import { UserListComponent } from './user-list/user-list.component';

import { TextInputAutocompleteMenuComponent } from './modules/textarea-autocomplete/text-input-autocomplete-menu.component';
import { TextInputAutocompleteContainerComponent } from './modules/textarea-autocomplete/text-input-autocomplete-container.component';
import { ChatComponent } from './chat/chat.component';
import { DialogComponent } from './services/dialog.component';
import { DialogInputComponent } from './services/dialoginput.component';
import { HashtagPipe } from './pipes/pipes';
import { HashtagRemovePipe } from './pipes/hashtagremove';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { WelcomenewComponent } from './welcomenew/welcomenew.component';


keyboardEventKeyPolyfill();
/** config angular i18n **/
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);

const routes: Routes = [
    {path: 'home', component: WelcomenewComponent },
  {
    path: 'auth',
    component: LoggedLayoutComponent,
    children: [ 
      {path: 'signup',component: RegisterComponent,data: {title: 'Signup'}},
      {path: 'login',component: LoginComponent,data: {title: 'Login'}},
      {path: 'reset-password',component: ResetPasswordComponent,data: {title: 'Reset Password'}},
      {path: 'change-password/:id',component: ChangePasswordComponent,data: {title: 'Change Password'}},
      {path: 'chat',component: ChatComponent,data: {title: 'chat'}},
      {path: 'profile',component: UserProfileComponent,canActivate: [AuthguardService],data: {title: 'Edit Profile'}}
      ]
    },
    {path: 'user', component: LoggedLayoutComponent,
     canActivate: [AuthguardService],
     children: [ 
      {path: 'list',component: UserListComponent,data: {title: 'List'}},
      {path: 'list/:id',component: UserListComponent,data: {title: 'List'}},
      {path: 'notifications',component: PostAdComponent,data: {title: 'Notifications'}}

      ]
    },
    {path: 'ad', component: LoggedLayoutComponent,
     children: [ 
      {path: 'list',component: AdListComponent,data: {title: 'Ad List'}},
      {path: 'list/:id',component: AdListComponent,data: {title: 'Ad List'}},
      {path: 'view/:id',component: ViewAdComponent,data: {title: 'View Ad'}},
      {path: 'post',component: PostAdComponent,canActivate: [AuthguardService],data: {title: 'Post Ad'}},
      { path: 'edit/:id', component: EditAdComponent,data: {title: 'Edit Ad'} }

      ]
    },
    {path: '', component: DefaultLayoutComponent,
     children: [ 
      {path: '',component: WelcomeComponent,data: {title: 'Welcome'}},
      {path: 'home',component: WelcomenewComponent,data: {title: 'Welcome'}}
      ]
    }
  ];

@NgModule({
  declarations: [
    AppComponent,
    LoginLayoutComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    PostAdComponent,
    WelcomeComponent,
    DefaultLayoutComponent,
    LoggedLayoutComponent,
    AdListComponent,
    UserProfileComponent,
    SidebarComponent,
    EditAdComponent,
    ViewAdComponent,
    UserListComponent,
    ChatComponent,
    HashtagPipe,
    HashtagRemovePipe,
    DialogComponent,
    DialogInputComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    WelcomenewComponent
    ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    LayoutModule,
    MatGridListModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatProgressBarModule,
    HttpClientModule,
    MatSnackBarModule,
    TextInputAutocompleteModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatSidenavModule,
    MatMenuModule,
    MatBadgeModule,
    MatDialogModule,
    NgbModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatCheckboxModule,
    ShareButtonsModule,
    MatExpansionModule,
    MatRippleModule,
    NgxEditorModule,
    NgZorroAntdModule
    ],
  providers: [ApiService,UserService,JwtService,AuthguardService,BrowserLocation,HashtagService,DialogService,CommonService,DialogInputService,{ provide: NZ_I18N, useValue: en_US },SharedService],
  bootstrap: [AppComponent],
  exports:[
    RouterModule
  ],
  entryComponents:[  TextInputAutocompleteMenuComponent,
  TextInputAutocompleteContainerComponent,DialogComponent,DialogInputComponent]
})
export class AppModule { 

}
