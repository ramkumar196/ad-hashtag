import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSidenavModule} from '@angular/material/sidenav';

import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { RouterModule, Routes, ActivatedRoute ,Router ,NavigationEnd } from '@angular/router';
import {Title} from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { DialogService } from 'src/app/services/dialog.service';
import { JwtService } from 'src/app/services/jwt.service';


@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {
  mobileQuery: MediaQueryList;
  isCollapsed = false;
  siderWidth ='200px';
  @ViewChild('sidenav',{ read: true, static: false }) public myNav: MatSidenavModule;


  private _mobileQueryListener: () => void;
  pageTitle;

     toggleTxt = this.myNav;
  
  constructor(private elementRef: ElementRef,private userService: UserService,titleService:Title,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private dialog: DialogService,private router: Router,private route: ActivatedRoute,private jwtService: JwtService,) {
	this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();this.toggleTxt='';
    this.mobileQuery.addListener(this._mobileQueryListener);
    router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        var title = this.getTitle(router.routerState, router.routerState.root).join('-');
        console.log('title', title);
       title=title.replace(',','');
        this.pageTitle = title;
                console.log('his.pageTitle', this.pageTitle);

        titleService.setTitle(title);
   console.log(this.toggleTxt);

      }
    });
   }

   menuList =[
   { 'click':"",'loginStatus':!this.loginStatus(),'routeLink':'/auth/login','iconName':'account_circle','listName':'Login'},
   { 'click':"",'loginStatus':!this.loginStatus(),'routeLink':'/auth/signup','iconName':'account_circle','listName':'Signup'},
   { 'click':"",'loginStatus':this.loginStatus(),'routeLink':'/ad/post','iconName':'create','listName':'Post Ad'},
   { 'click':"",'loginStatus':!this.loginStatus(),'routeLink':'/ad/list','iconName':'search','listName':'Search Ads'},
   { 'click':"",'loginStatus':!this.loginStatus(),'routeLink':'/auth/trending','iconName':'trending_up','listName':'Trending'},
   { 'click':"",'loginStatus':this.loginStatus(),'routeLink':'/auth/profile','iconName':'account_circle','listName':'Edit Profile'},
   { 'click':"",'loginStatus':this.loginStatus(),'routeLink':'/user/list','iconName':'list','listName':'Your Listings'},
   { 'click':"",'loginStatus':this.loginStatus(),'routeLink':'/user/subscriptions','iconName':'subscriptions','listName':'Subscriptions'},
   { 'click':'','loginStatus':this.loginStatus(),'routeLink':'','iconName':'block','listName':'Logout'},
   ];

   toggleCollapsed(): void {


    if(this.isCollapsed == false)
    this.siderWidth = 'auto';
    else
    this.siderWidth = '200px';

    this.isCollapsed = !this.isCollapsed;
  }

   getTitle(state, parent) {
    var data = [];
    if(parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if(state && parent) {
      data.push(this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

    loginStatus()
  {
    return this.userService.checklogin();
  }

    logout() 
  {
    console.log('jwt toke',this.jwtService.getToken());
    if(this.jwtService.getToken() != '')
    {
    this.jwtService.destroyToken();
    this.dialog.confirm({title:'Logout',message:'Logged out Successfully',confirm:false})

    this.router.navigate(['/auth/login']);
    }
  }


  ngOnInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#333';

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
