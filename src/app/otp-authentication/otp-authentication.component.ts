import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-otp-authentication',
  templateUrl: './otp-authentication.component.html',
  styleUrls: ['./otp-authentication.component.css']
})
export class OtpAuthenticationComponent {

  messageSource:any;
  otpValue:any;
  resetPwd:boolean;
  pwdValNew:any;
  pwdValCnf:any;
  errorDisplay:boolean;
  invalidOtp:boolean;
  errMsg:string;
  mobile:any;
  successRegPopUp:boolean;
  mobileNumber:number;
  regSuccess:boolean;
  userType:string;

    constructor(private dataService: DataService, private router: Router,  private cookieService: CookieService) { }
  ngOnInit() {
    this.resetPwd = false;
    this.dataService.cast.subscribe(messageSource => this.messageSource = messageSource)
    this.dataService.mobileTemp.subscribe(mobileNum => this.mobileNumber = mobileNum)
    this.dataService.userTypeVal.subscribe(userType => this.userType = userType)
    console.log('message::'+this.messageSource);
  }
  sendOtp(){
      console.log('send otp:'+ this.mobileNumber)
        this.dataService.sendOtp(this.mobileNumber).subscribe(
           data => {
             this.dataService.changeMessage(data+'Regi')
           },
           error => {
           }
        );
  }

  verifyOtp(){
  this.dataService.cast.subscribe(messageSource => this.messageSource = messageSource)
  console.log('verifyOtp::'+this.messageSource);
  if(this.messageSource == (this.otpValue+'Regi')){
    this.regSuccess = true;
    //this.successRegPopUp = true;
   //this.router.navigate(['/', 'signIn']);
  }else if(this.messageSource == this.otpValue){
    this.resetPwd = true;
  }else{
    this.invalidOtp = true;
  }
}
  resetPswd(){
    if (this.pwdValNew == this.pwdValCnf) {
      this.mobile = this.cookieService.get('resetPwdMobile');
      this.dataService.resetpassword(this.pwdValNew,this.mobile).subscribe(
         data => {
           this.router.navigate(['/', 'signIn']);
           return true;
         },
         error => {
           this.errorDisplay = true;
           this.errMsg = 'Could not Reset the password. Try Again';
         }
      );
    }else{
      this.errorDisplay = true;
      this.errMsg = 'Password Match error';
    }
  }

  successReg(){
    if (this.userType == 'business') {
      this.dataService.changeProfile('true')
      this.router.navigate(['/', 'userData']);
    }else if(this.userType == 'individual'){
      this.dataService.changeindProfile('true')
      this.router.navigate(['/', 'individualDetails']);
    }
   }

}
