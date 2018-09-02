import { Component, OnInit ,AfterViewInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute ,Router ,NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ModuleWithProviders, NgModule  } from '@angular/core';



export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@NgModule({
  declarations: [
    ],
  imports: [
    MatProgressBarModule
    ],
  providers: [],
  bootstrap: []
})

@Component({
  selector: 'app-home',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.css']
})
export class LoginLayoutComponent implements AfterViewInit {

  loading ;
  constructor(private router: Router,private route: ActivatedRoute) { 
            this.loading = true;
  }

 ngAfterViewInit() {
        this.router.events
            .subscribe((event) => {
                if(event instanceof NavigationStart) {
                    this.loading = true;
                }
                else if (
                    event instanceof NavigationEnd || 
                    event instanceof NavigationCancel
                    ) {
                    this.loading = false;
                }
            });
    }
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

}
