import { Component, OnInit  } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute ,Router ,NavigationEnd } from '@angular/router';
import {Title} from '@angular/platform-browser';
import {UserService} from '../../../services/user.service';
import {JwtService} from '../../../services/jwt.service';
import { DialogService } from '../../../services/dialog.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  pageTitle;
  geolocationPosition;
  constructor(private dialog: DialogService,private router: Router,private route: ActivatedRoute , titleService:Title,private userService: UserService,private jwtService: JwtService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    console.log(this.mobileQuery);
  router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        var title = this.getTitle(router.routerState, router.routerState.root).join('-');
        console.log('title', title);
       title=title.replace(',','');
        this.pageTitle = title;
                console.log('his.pageTitle', this.pageTitle);

        titleService.setTitle(title);

      }
    });
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
    this.jwtService.destroyToken();
    this.dialog.confirm({title:'Logout',message:'Logged out Successfully',confirm:false})

    this.router.navigate(['/auth/login']);
  }

    Gotologin()
  {
    this.router.navigate(['login'],{relativeTo:this.route})
  }

  Gotosignup()
  {
    this.router.navigate(['login'],{relativeTo:this.route})
  }

  verifyToken()
  {
     this.userService
    .verifyToken({})
    .subscribe(
      data => {
        console.log("data",data);
      },
      err => {
        if(err.status == 401)
        this.logout();
      }
    );  } 
  
  ngOnInit() {
      this.verifyToken();
  }

    ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
