import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { RegisterComponent } from '../register/register.component';
import { ApiService } from '../services/api.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http'; 


//import { SharedModule } from '../shared'; 

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '/',
    component: HomeComponent,
    children: [ 
      {
        path: 'signup',
        component: RegisterComponent
      },
      {
        path: 'login',
        component: RegisterComponent
      }
      ]
    }
]);

@NgModule({
  imports: [
    homeRouting,
    HttpClientModule
  ],
  declarations: [
    HomeComponent,
    RegisterComponent,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDividerModule
  ],
  providers: [
  ApiService
  ]
})
export class HomeModule {}