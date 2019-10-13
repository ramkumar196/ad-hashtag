import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMentionModule } from 'ng-zorro-antd/mention';
import { NzUploadModule } from 'ng-zorro-antd/upload';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzMentionModule,
    NzUploadModule
  ],
  exports:[
    NzMentionModule,
    NzUploadModule
  ]
})
export class AntDesignModule { }
