import { Component, OnInit  } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute ,Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private router: Router,private route: ActivatedRoute) {   }

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
