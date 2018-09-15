import { Component, OnInit  } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute ,Router ,NavigationEnd } from '@angular/router';
import {Title} from '@angular/platform-browser';
import {UserService} from '../../../services/user.service';
import {JwtService} from '../../../services/jwt.service';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  pageTitle;
  constructor(private router: Router,private route: ActivatedRoute , titleService:Title,private userService: UserService,private jwtService: JwtService) { 
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

  ngOnInit() {
  }

}
