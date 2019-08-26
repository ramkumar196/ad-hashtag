import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import { AdListComponent } from 'src/app/features/ad/components/ad-list/ad-list.component';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent {

  @Inject(MAT_BOTTOM_SHEET_DATA) public data: any;
  private bottomSheet: MatBottomSheet

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AdListComponent>,
  ) {}

  openLink(event: MouseEvent): void {
    console.log("inside botsheet data",this.data)
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
