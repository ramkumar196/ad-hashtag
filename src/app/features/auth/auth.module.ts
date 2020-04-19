import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/frontend-layout/header/header.component';
import { FooterComponent } from 'src/app/shared';
import { AngularMaterialModule } from 'src/app/design/angular-material/angular-material.module';
import { AuthguardService } from 'src/app/services/authguard.service';
import { DefaultLayoutComponent } from 'src/app/shared/default-layout/default-layout.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppBrowserModule } from 'src/app/app.browser.module';
import { I18nModule } from 'src/app/modules/i18n/i18n.module';


const routes: Routes = [
  {
      path: 'auth',
      component: DefaultLayoutComponent,
      children: [ 
        {path: 'signup',component: RegisterComponent,data: {title: 'Signup'}},
        {path: 'login',component: LoginComponent,data: {title: 'Login'}},
        {path: 'reset-password',component: ResetPasswordComponent,data: {title: 'Reset Password'}},
        {path: 'change-password/:id',component: ChangePasswordComponent,data: {title: 'Change Password'}},
        {path: 'profile',component: UserProfileComponent,canActivate: [AuthguardService],data: {title: 'Edit Profile'}}
        ]
  }
];


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    AngularMaterialModule,
    SharedModule,
    AppBrowserModule,
    I18nModule
  ],
  exports:[
    RouterModule
  ]
})
export class AuthModule { }
