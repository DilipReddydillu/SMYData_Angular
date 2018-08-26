import { Component ,Input,Output, OnChanges } from '@angular/core';
import { DataService } from '../data.service';
import {Observable} from 'rxjs/Rx';
import {WebStorageService} from 'angular-webstorage-service';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastsManager,ToastOptions  } from 'ng5-toastr/ng5-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


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
    view = true;
    showProfile;
    userType;
    validMobile = false;
    public pattern_mobile = /^\d{10}$/;


    constructor(private _demoService: DataService, private router: Router, private cookieService: CookieService,  private toastr:ToastsManager) { }

    ngOnInit(): void {
      this._demoService.userTypeVal.subscribe(userType => this.userType = userType)
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
      this.logInUser(this.model,this.userType)
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

     logInUser(data,type) {
         let JsonData = data;
         this._demoService.logInUser(JsonData,type).subscribe(
            data => {
              if(data == true){
              console.log("valid user!");
            if (type == 'business') {
              this.showProfile = true;
              this.submitted = true;
              this._demoService.changeProfile('true')
              this.router.navigate(['/', 'userData']);
            }else if(type == 'individual'){
              this._demoService.changeindProfile('true')
              this.router.navigate(['/', 'individualDetails']);
            }
              return true;
            }else{
              console.error("not registered!");
              this.loginFail =true;
            }
            },
            error => {
              console.error("not registered!");
              this.loginFail =true;
              //this._demoService.changeProfile('true')
              return Observable.throw(error);
            }
         );
       }

       validation(){
         console.log("in validation method:");
         if (!this.pattern_mobile.test(this.model.mobile)) {
                 this.toastr.error("Please enter valid mobile number", 'Error',[{dismiss: 'click'},{maxShown:'1'}]);
                 this.model.mobile = '';
           }else{
             this.toastr.clearAllToasts();
           }
         }

}
