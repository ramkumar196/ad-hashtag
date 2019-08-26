import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { TrendingComponent } from '../user/components/trending/trending.component';
import { HeaderComponent, FooterComponent } from 'src/app/shared';
import { AngularMaterialModule } from 'src/app/design/angular-material/angular-material.module';
import { AuthguardService } from 'src/app/services/authguard.service';
import { HashtagPipe } from 'src/app/pipes/pipes';
import { HashtagRemovePipe } from 'src/app/pipes/hashtagremove';
import { SharedModule } from 'src/app/shared/shared.module';
import { DefaultLayoutComponent } from 'src/app/shared/default-layout/default-layout.component';
import { AppBrowserModule } from 'src/app/app.browser.module';

const routes: Routes = [
  { path: '', component: DefaultLayoutComponent,
    children: [ 
    {path: '',component: WelcomeComponent,data: {title: 'Welcome'}},
    {path: 'trending',component: TrendingComponent,data: {title: 'Trending'}},
    ]
  }
];


@NgModule({
  declarations: [
    WelcomeComponent,
    TrendingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    AngularMaterialModule,
    AppBrowserModule,
    SharedModule
  ],
  providers:[AuthguardService],
  exports:[
    RouterModule
  ]
})
export class HomeModule { }
