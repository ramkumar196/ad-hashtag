import { Injectable }     from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {UserService} from './user.service';



@Injectable()
export class AuthguardService implements CanActivate {
	constructor(private userservice: UserService, private router: Router) {}
	canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Promise<boolean> | boolean {
console.log(this.userservice.checklogin());
    if (this.userservice.checklogin()) { return true; }

    // Navigate to the login page with extras
    this.router.navigate(['/auth/login']);
    return false;
  }
}