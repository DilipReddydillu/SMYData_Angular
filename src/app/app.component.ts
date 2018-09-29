import { Component,ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import { DataService } from './data.service';
import { Location } from '@angular/common';


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
  selectedBU = "";
  businessList:any;
  constructor(private _dataService: DataService,public toastr: ToastsManager, private router: Router, private cookieService: CookieService,private location:Location, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
    }
       ngOnInit(): void {
         this._dataService.profile.subscribe(showProfile =>
            this.showProfile = showProfile);
         this._dataService.indprofile.subscribe(indProfile =>
           this.indProfile = indProfile)
         this._dataService.buListData.subscribe(buList =>
           this.businessList = buList);
         this._dataService.selectedBUVal.subscribe(selectedBU =>
           this.selectedBU = selectedBU.companyName);
         this.allCookies = this.cookieService.getAll();
         if(this.allCookies && this.allCookies.mobile){
          // this.showProfile = true;
        };

        if(this.businessList){
          this.selectedBU =  this.businessList.businessDetails[0].companyName;
        }

    };

    signInCall(){
      this.view='';
      this.router.navigate(['/', 'select']);
    }

    changeBU(obj){
      console.log(obj)
      this.selectedBU = obj.companyName;
      this._dataService.changeselectedBUVal(obj);
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([this.location.path()]));
      // this._dataService.changeMyBusiness(obj).subscribe(
      //    data => {
      //      this.selectedBU = obj.companyName;
      //      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      //       this.router.navigate([this.location.path()]));
      //      this.toastr.success("", "Business Changed",{toastLife: '3000'});
      //    },
      //    error => {
      //      this.toastr.error("", "ERROR!!",{toastLife: '3000'});
      //    }
      // );
    }

    logOut(){
      this._dataService.changeProfile(false);
      this._dataService.changeindProfile(false);
       this.showProfile = false;
       this.indProfile = false;
       this._dataService.logout().subscribe(
         data => {
           console.log("logged out..");
         },error => {
           console.log("logged out failed..");
         });
       this.router.navigate(['']);
    }


}
