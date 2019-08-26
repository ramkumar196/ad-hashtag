import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/frontend-layout/header/header.component';
import { FooterComponent } from 'src/app/shared';
import { AngularMaterialModule } from 'src/app/design/angular-material/angular-material.module';
import { AuthguardService } from 'src/app/services/authguard.service';
import { DefaultLayoutComponent } from 'src/app/shared/default-layout/default-layout.component';
import { AdListComponent } from './components/ad-list/ad-list.component';
import { ViewAdComponent } from './components/view-ad/view-ad.component';
import { PostAdComponent } from './components/post-ad/post-ad.component';
import { EditAdComponent } from './components/edit-ad/edit-ad.component';
import { AppBrowserModule } from 'src/app/app.browser.module';
import { TextInputAutocompleteMenuComponent } from 'src/app/modules/textarea-autocomplete/text-input-autocomplete-menu.component';
import { TextInputAutocompleteContainerComponent } from 'src/app/modules/textarea-autocomplete/text-input-autocomplete-container.component';
import { TextInputAutocompleteModule } from 'src/app/modules/textarea-autocomplete/text-input-autocomplete.module';


const routes: Routes = [
  {path: 'ad', component: DefaultLayoutComponent,
   children: [ 
    {path: 'list',component: AdListComponent,data: {title: 'Ad List'}},
    {path: 'list/:id',component: AdListComponent,data: {title: 'Ad List'}},
    {path: 'view/:id',component: ViewAdComponent,data: {title: 'View Ad'}},
    {path: 'post',component: PostAdComponent,canActivate: [AuthguardService],data: {title: 'Post Ad'}},
    { path: 'edit/:id', component: EditAdComponent,data: {title: 'Edit Ad'} }
    ]
  }
];


@NgModule({
  declarations: [
    AdListComponent,
    ViewAdComponent,
    PostAdComponent,
    EditAdComponent
    ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    AngularMaterialModule,
    AppBrowserModule,
    TextInputAutocompleteModule
  ],
  providers:[AuthguardService],
  exports:[
    RouterModule
  ]
})
export class AdModule { }
