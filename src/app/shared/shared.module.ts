import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/design/angular-material/angular-material.module';
import { LoggedLayoutComponent } from './logged-layout/logged-layout.component';
import { FooterComponent, HeaderComponent } from './frontend-layout';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';

const routes: Routes = [
];


@NgModule({
  declarations: [
      LoginLayoutComponent,
      LoggedLayoutComponent,
      HeaderComponent,
      FooterComponent,
      DefaultLayoutComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    
  ],
  providers:[],
  exports:[
    RouterModule
  ]
})
export class SharedModule { }
