import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from './features/home/home.module';


const routes: Routes = [
//{path: 'home', component: WelcomenewComponent },
// {
//   path: 'auth',
//   component: DefaultLayoutComponent,
//   children: [ 
//     {path: 'signup',component: RegisterComponent,data: {title: 'Signup'}},
//     {path: 'login',component: LoginComponent,data: {title: 'Login'}},
//     {path: 'trending',component: TrendingComponent,data: {title: 'Trending'}},
//     {path: 'reset-password',component: ResetPasswordComponent,data: {title: 'Reset Password'}},
//     {path: 'change-password/:id',component: ChangePasswordComponent,data: {title: 'Change Password'}},
//     {path: 'chat',component: ChatComponent,data: {title: 'chat'}},
//     {path: 'profile',component: UserProfileComponent,canActivate: [AuthguardService],data: {title: 'Edit Profile'}}
//     ]
//   },
//   {path: 'user', component: DefaultLayoutComponent,
//    canActivate: [AuthguardService],
//    children: [ 
//     {path: 'list',component: UserListComponent,data: {title: 'List'}},
//     {path: 'list/:id',component: UserListComponent,data: {title: 'List'}},
//     {path: 'notifications',component: NotificationlistComponent,data: {title: 'Notifications'}},
//     {path: 'subscriptions',component: SubscriptionListComponent,data: {title: 'Subscriptions List'}}

//     ]
//   },
//   {path: 'ad', component: DefaultLayoutComponent,
//    children: [ 
//     {path: 'list',component: AdListComponent,data: {title: 'Ad List'}},
//     {path: 'list/:id',component: AdListComponent,data: {title: 'Ad List'}},
//     {path: 'view/:id',component: ViewAdComponent,data: {title: 'View Ad'}},
//     {path: 'post',component: PostAdComponent,canActivate: [AuthguardService],data: {title: 'Post Ad'}},
//     { path: 'edit/:id', component: EditAdComponent,data: {title: 'Edit Ad'} }

//     ]
//   },
//   {path: '', component: DefaultLayoutComponent,
//    children: [ 
//     {path: '',component: WelcomeComponent,data: {title: 'Welcome'}},
//     {path: 'home',component: WelcomenewComponent,data: {title: 'Welcome'}}
//     ]
//   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
