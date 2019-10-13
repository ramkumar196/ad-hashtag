import { ModuleWithProviders, NgModule  } from '@angular/core';

import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';
import { JwtService } from './services/jwt.service';
import { AuthguardService } from './services/authguard.service';
import { BrowserLocation } from './services/browserlocation.service';
import { HashtagService } from './services/hashtag.service';
import { DialogService } from './services/dialog.service';
import { DialogInputService } from './services/dialoginput.service';
import { CommonService } from './services/common.service';
import { SharedService } from './services/shared.service';
import { SocketService } from './services/socket.service';
//import { LoginLayoutModule } from './login-layout/login-layout.module';
import { polyfill as keyboardEventKeyPolyfill } from 'keyboardevent-key-polyfill';



keyboardEventKeyPolyfill();
/** config angular i18n **/
import { AngularMaterialModule } from './design/angular-material/angular-material.module';
import { HomeModule } from './features/home/home.module';
import { AuthModule } from './features/auth/auth.module';
import { AdModule } from './features/ad/ad.module';
import { UserModule } from './features/user/user.module';
import { SharedModule } from './shared/shared.module';
import { AppBrowserModule } from './app.browser.module';
import { AntDesignModule } from './design/ant-design/ant-design.module';


@NgModule({
  bootstrap:[AppComponent],
  declarations: [
    AppComponent,
   
    ],
  imports:[
    AngularMaterialModule,
    AntDesignModule,
    HomeModule,
    AuthModule,
    AdModule,
    UserModule,
    SharedModule,
    AppBrowserModule
  ],
  providers: [ApiService,UserService,JwtService,AuthguardService,BrowserLocation,HashtagService,DialogService,CommonService,DialogInputService,SharedService,SocketService],
  exports:[
  ],
  entryComponents:[  ]
})
export class AppModule { 

}
