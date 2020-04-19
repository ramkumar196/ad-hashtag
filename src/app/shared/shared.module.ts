import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoggedLayoutComponent } from './logged-layout/logged-layout.component';
import { FooterComponent, HeaderComponent } from './frontend-layout';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { AppBrowserModule } from '../app.browser.module';
import { AngularMaterialModule } from '../design/angular-material/angular-material.module';
import { AntDesignModule } from '../design/ant-design/ant-design.module';
import { SelectLanguageComponent } from './select-language/select-language.component';

const routes: Routes = [
];


@NgModule({
  declarations: [
      LoginLayoutComponent,
      LoggedLayoutComponent,
      HeaderComponent,
      FooterComponent,
      DefaultLayoutComponent,
      SelectLanguageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppBrowserModule,
    AngularMaterialModule,
    AntDesignModule,
    
  ],
  providers:[],
  exports:[
    RouterModule,
    
  ]
})
export class SharedModule { }
