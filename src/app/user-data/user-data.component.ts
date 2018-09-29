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
selectedBU;
  constructor(private _dataService: DataService, private router: Router,private location:Location, private cookieService: CookieService) {
   }
  ngOnInit() {
    this._dataService.selectedBUVal.subscribe(selectedBU =>
      this.selectedBU = selectedBU.companyName);
    this._dataService.newBusinessVal.subscribe(newBusinessVal => this.addNewBusinessForm = newBusinessVal);
    this.showRegForm = this.addNewBusinessForm;
    console.log(this.selectedBU)
    if (this.location.path() == "/userData" && this.selectedBU == undefined){
      this.showBuList();
     }
    // else if(this.location.path() == "/userData" && this.businessList != null && this.businessList.businessDetails[0].businessDetailId == this.selectedBU.businessDetailId) {
    //  }
  }
addNewBusiness(){
  this.showeditForm = false;
  this.invoice = this.payables=this.receivables = false;
 this._dataService.isNewBusiness(true);
 this.showRegForm = this.addNewBusinessForm;
}
viewBusinessDetails(data){
  this.showRegForm = false;
  this._dataService.isNewBusiness(false);
  let model=data
  this._dataService.editBusinessData(model);
  this.showeditForm = true;
  this.showbusinessList = false;
}
showBuList(){
  this._dataService.viewMyBusiness().subscribe(
     data => {
       this.businessList = data;
         this._dataService.changeBusinessList(this.businessList);
         this._dataService.changeselectedBUVal(this.businessList.businessDetails[0]);
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
