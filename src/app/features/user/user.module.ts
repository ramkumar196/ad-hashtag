import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent, HeaderComponent } from 'src/app/shared';
import { AngularMaterialModule } from 'src/app/design/angular-material/angular-material.module';
import { AuthguardService } from 'src/app/services/authguard.service';
import { DefaultLayoutComponent } from 'src/app/shared/default-layout/default-layout.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { NotificationlistComponent } from '../auth/components/notificationlist/notificationlist.component';
import { SubscriptionListComponent } from './components/subscription-list/subscription-list.component';
import { AppBrowserModule } from 'src/app/app.browser.module';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { NotificationsComponent } from './components/notifications/notifications.component';


const routes: Routes = [
  {path: 'user', component: DefaultLayoutComponent,
   canActivate: [AuthguardService],
   children: [ 
    {path: 'list',component: UserListComponent,data: {title: 'List'}},
    {path: 'account',component: UserAccountComponent,data: {title: 'Account'}},
    {path: 'account/:id',component: UserAccountComponent,data: {title: 'Account'}},
   // {path: 'list/:id',component: UserListComponent,data: {title: 'List'}},
    {path: 'notifications',component: NotificationlistComponent,data: {title: 'Notifications'}},
    {path: 'subscriptions',component: SubscriptionListComponent,data: {title: 'Subscriptions List'}}
   ]
  }   
];


@NgModule({
  declarations: [
    UserListComponent,
    NotificationlistComponent,
    SubscriptionListComponent,
    UserAccountComponent,
    NotificationsComponent,
  ],
  providers:[AuthguardService],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    AngularMaterialModule,
    AppBrowserModule
  ],
  exports:[
    RouterModule
  ]
})
export class UserModule { }
