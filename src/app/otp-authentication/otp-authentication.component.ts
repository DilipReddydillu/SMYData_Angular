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

    constructor(private data: DataService, private router: Router,  private cookieService: CookieService) { }
  ngOnInit() {
    this.resetPwd = false;
    this.data.cast.subscribe(messageSource => this.messageSource = messageSource)
    console.log('message::'+this.messageSource);
  }

  verifyOtp(){
  this.data.cast.subscribe(messageSource => this.messageSource = messageSource)
  console.log('verifyOtp::'+this.messageSource);
  if(this.messageSource == (this.otpValue+'Regi')){
    this.successRegPopUp = true;
   this.router.navigate(['/', 'signIn']);
  }else if(this.messageSource == this.otpValue){
    this.resetPwd = true;
  }else{
    this.invalidOtp = true;
  }
}
  resetPswd(){
    if (this.pwdValNew == this.pwdValCnf) {
      this.mobile = this.cookieService.get('resetPwdMobile');
      this.data.resetpassword(this.pwdValNew,this.mobile).subscribe(
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

}
