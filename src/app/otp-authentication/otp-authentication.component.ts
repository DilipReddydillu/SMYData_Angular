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
  pswdResetSuccess:boolean;
  focusPassword;focusCnfPassword
    constructor(private dataService: DataService, private router: Router,  private cookieService: CookieService) { }
  ngOnInit() {
    this.resetPwd = false;
    this.dataService.cast.subscribe(messageSource => this.messageSource = messageSource)
    this.dataService.mobileTemp.subscribe(mobileNum => this.mobileNumber = mobileNum)
    this.dataService.userTypeVal.subscribe(userType => this.userType = userType)
  }
  sendOtp(){
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
  if(this.messageSource == (this.otpValue+'Regi')){
    this.regSuccess = true;
  }else if(this.messageSource == this.otpValue){
    this.resetPwd = true;
  }else{
    this.invalidOtp = true;
  }
}
  resetPswd(){
      this.mobile = this.cookieService.get('resetPwdMobile');
      this.dataService.resetpassword(this.pwdValNew,this.mobile).subscribe(
         data => {
          this.pswdResetSuccess = true;
          this.pwdValNew = this.pwdValCnf = "";
         },
         error => {
           this.errorDisplay = true;
           this.errMsg = 'Could not Reset the password. Try Again';
         }
      );
  }
  focusFunction(pristine,valid,event,type){
    if(event == 'focus'){
     this[type] = "focusGreen";
   }
   else if (!pristine && !valid) {
     this[type] = "focusRed";
   }
   if(pristine && (event == 'outfocus')){
     this[type] = "";
   }
  }
  successReg(){
    this.router.navigate(['/', 'signIn']);
   }

}
