import { Component ,Input,Output, OnChanges } from '@angular/core';
import { DataService } from '../data.service';
import {Observable} from 'rxjs/Rx';
import {WebStorageService} from 'angular-webstorage-service';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent  {
//@Output() id: string;
messageSource:number;
  cookieValue = 'UNKNOWN';
  public model: any = {mobile:'',password:''};
    mobileNumVal:any;
    submitted = false;
    rememberMe = false;
    loginFail = false;
    public data:any=[];
    storage: any=[];
    allCookies;

    constructor(private _demoService: DataService, private router: Router, private cookieService: CookieService) { }

    ngOnInit(): void {
      this._demoService.cast.subscribe(messageSource => this.messageSource = messageSource)
      console.log('message::'+this.messageSource);
      this.allCookies = this.cookieService.getAll();
      console.log(this.allCookies);
      if(this.allCookies && this.allCookies.rememberMeVal == 'TRUE'){
        this.model.mobile = this.allCookies.mobile;
        this.model.password = this.allCookies.pswd;
        this.rememberMe = true;
      };
 };


    onSubmit() {
    console.log(this.model)
      this.logInUser(this.model)
      if(this.rememberMe){
        this.cookieService.set( 'mobile', this.model.mobile );
        this.cookieService.set( 'pswd', this.model.password );
        this.cookieService.set( 'rememberMeVal', this.rememberMe?'TRUE':'FALSE');
      }else{
        this.cookieService.deleteAll();
      };
    };

    sendOtp(){
      console.log(this.mobileNumVal);
          this.router.navigate(['/', 'otpVerification']);
          document.getElementById('modalWindow').click();
          this.cookieService.set('resetPwdMobile',this.mobileNumVal);
          this._demoService.sendOtp(this.mobileNumVal).subscribe(
             data => {
               this._demoService.changeMessage(data)
             },
             error => {
               this.cookieService.delete('resetPwdMobile');

             }
          );
    }

     logInUser(data) {
         let JsonData = data;
         this._demoService.logInUser(JsonData).subscribe(
            data => {
              if(data == true){
              console.log(data)
              console.log("valid user!");
              this.submitted = true;
              this.router.navigate(['/', 'userData']);
              return true;
            }else{
              console.error("not registered!");
              this.loginFail =true;
            }
            },
            error => {
              console.error("not registered!");
              this.loginFail =true;
              return Observable.throw(error);
            }
         );
       }

}
