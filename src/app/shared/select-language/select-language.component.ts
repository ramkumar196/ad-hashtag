import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-select-language',
  template: `
    <mat-form-field>
  <mat-select #langSelect  (selectionChange)="selectLang($event.value)">
    <mat-option *ngFor="let lang of translate.getLangs()" [value]="lang">
    {{langArray[lang]}}
    </mat-option>
  </mat-select>
</mat-form-field>
  `,
})
export class SelectLanguageComponent implements OnInit  {
  constructor(public translate: TranslateService) {   ;
  }
  langArray = {'en':'English','ta':'தமிழ்'};

  selectLang(value)
  {
    console.log(value);
    this.translate.use(value);
  }

  ngOnInit() {
    //this.translate.use('en');
  }

}