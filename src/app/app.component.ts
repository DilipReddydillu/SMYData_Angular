import { Component,ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SmyData';
  view = 'homePage';
  showProfile =false;
  indProfile = false;
  allCookies;
  constructor(private _demoService: DataService,public toastr: ToastsManager, private router: Router, private cookieService: CookieService, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
    }
       ngOnInit(): void {
         this._demoService.profile.subscribe(showProfile => this.showProfile = showProfile)
         this._demoService.indprofile.subscribe(indProfile => this.indProfile = indProfile)
         this.allCookies = this.cookieService.getAll();
         console.log(this.allCookies);
         if(this.allCookies && this.allCookies.mobile){
          // this.showProfile = true;
         };
    };

    signInCall(){
      this.view='';
      this.router.navigate(['/', 'select']);
    }

    logOut(){
      this._demoService.changeProfile(false);
      this._demoService.changeindProfile(false);
       this.showProfile = false;
       this.indProfile = false;
      // this.cookieService.deleteAll();
       this.router.navigate(['']);
    }


}
