import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataService } from '../data.service';

@Injectable()
export class AuthGuard implements CanActivate {
showProfile;
constructor(private router: Router,private dataService:DataService) {
  this.dataService.profile.subscribe(showProfile => this.showProfile = showProfile)
 }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
{
    console.log("Smile:)");
    console.log(this.showProfile)
    if (this.showProfile) {
        // logged in so return true
        return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/home'],);
    return false;
  }
 }
