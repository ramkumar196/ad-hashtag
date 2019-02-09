import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextInputAutocompleteMenuComponent } from './text-input-autocomplete-menu.component';
import { TextInputAutocompleteDirective } from './text-input-autocomplete.directive';
import { TextInputAutocompleteContainerComponent } from './text-input-autocomplete-container.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { QuillModule } from 'ngx-quill'




@NgModule({
  imports: [
  CommonModule,
  MatListModule,
  MatIconModule,
  QuillModule
  ],
  declarations: [
  TextInputAutocompleteMenuComponent,
  TextInputAutocompleteDirective,
  TextInputAutocompleteContainerComponent
  ],
  exports:[
  TextInputAutocompleteMenuComponent,
  TextInputAutocompleteDirective,
  TextInputAutocompleteContainerComponent
  ]
 })

export  class TextInputAutocompleteModule {
}
