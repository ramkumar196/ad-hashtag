import { BrowserModule , BrowserTransferStateModule} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { ModuleWithProviders, NgModule  } from '@angular/core';
import {LayoutModule} from '@angular/cdk/layout';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TextInputAutocompleteModule } from './modules/textarea-autocomplete/text-input-autocomplete.module';
import { TextInputAutocompleteMenuComponent } from './modules/textarea-autocomplete/text-input-autocomplete-menu.component';
import { TextInputAutocompleteContainerComponent } from './modules/textarea-autocomplete/text-input-autocomplete-container.component';
import { HashtagPipe } from './pipes/pipes';
import { HashtagRemovePipe } from './pipes/hashtagremove';



registerLocaleData(en);
    
    @NgModule({
        declarations:[
            HashtagPipe,
            HashtagRemovePipe,
            ],
        imports:[
            BrowserModule.withServerTransition({appId: 'app-root'}),
            BrowserTransferStateModule,
            AppRoutingModule,
            IconsProviderModule,
            NgZorroAntdModule,
            FormsModule,
            HttpClientModule,
            ReactiveFormsModule,
            MatAutocompleteModule,
            BrowserAnimationsModule,
            ShareButtonsModule,
            FlexLayoutModule,
            TextInputAutocompleteModule,
        ],
        exports:[
            IconsProviderModule,
            NgZorroAntdModule,
            FormsModule,
            HttpClientModule,
            ReactiveFormsModule,
            MatAutocompleteModule,
            BrowserAnimationsModule,
            ShareButtonsModule,
            FlexLayoutModule,
            TextInputAutocompleteModule,
            HashtagPipe,
            HashtagRemovePipe,
        ],
        entryComponents:[
            TextInputAutocompleteMenuComponent,
            TextInputAutocompleteContainerComponent,
        ],
        providers: [{ provide: NZ_I18N, useValue: en_US }]
    })
    export class AppBrowserModule {}
    