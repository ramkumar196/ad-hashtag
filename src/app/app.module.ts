import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule  } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http'; 
import { Headers, Http, Response, URLSearchParams } from '@angular/http';


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






import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes} from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './shared/frontend-layout/header/header.component';
import { FooterComponent } from './shared/frontend-layout/footer/footer.component';

import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';
import { JwtService } from './services/jwt.service';



import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { PostAdComponent } from './post-ad/post-ad.component';

import { polyfill as keyboardEventKeyPolyfill } from 'keyboardevent-key-polyfill';
import { TextInputAutocompleteModule } from 'angular-text-input-autocomplete';

keyboardEventKeyPolyfill();


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [ 
      {path: 'signup',component: RegisterComponent},
      {path: 'login',component: LoginComponent},
      {path: 'post-ad',component: PostAdComponent},
      ]
    },
    {path: '**', component: HomeComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    PostAdComponent
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
    MatCardModule
    ],
  providers: [ApiService,UserService,JwtService],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
