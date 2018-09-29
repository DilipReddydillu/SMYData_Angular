import { Component ,Input,Output, OnChanges, NgZone } from '@angular/core';
import { DataService } from '../data.service';
import {Observable} from 'rxjs/Rx';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent  {

showRegForm:boolean;
addNewBusinessForm:any;
showeditForm:boolean;
businessList:any;
showbusinessList:boolean;
myInfo:boolean;
invoice;
payables;
receivables;
profile;
buPlanCss;

  constructor(private _demoService: DataService, private router: Router,private location:Location, private cookieService: CookieService) {
   }
  ngOnInit() {
    this._demoService.newBusinessVal.subscribe(newBusinessVal => this.addNewBusinessForm = newBusinessVal);
    this._demoService.buPlanCssVal.subscribe(value => this.buPlanCss = value);
     this.showRegForm = this.addNewBusinessForm;
     if (this.location.path() == "/userData") {
       this.showBuList();
     }
  }
addNewBusiness(){
  this.showeditForm = false;
  this.invoice = this.payables=this.receivables = false;
 this._demoService.isNewBusiness(true);
 this.showRegForm = this.addNewBusinessForm;
}
viewBusinessDetails(data){
  this.showRegForm = false;
  this._demoService.isNewBusiness(false);
  let model=data
  this._demoService.editBusinessData(model);
  this.showeditForm = true;
  this.showbusinessList = false;
}
showBuList(){
  this._demoService.viewMyBusiness().subscribe(
     data => {
       this.businessList = data;
         this._demoService.changeBusinessList(this.businessList);
         this._demoService.changeselectedBUVal(this.businessList.businessDetails[0].companyName);
     },
     error => {
       alert("could not fetch BU data")
     }
  );
}

sideNav(value){
  this[value] = true;
  this.profile = false;
}
routeTo(url){
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
   this.router.navigate([url]));

}
}
