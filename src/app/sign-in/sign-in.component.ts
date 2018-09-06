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
    errMsg;
    focusMobile;
    focusPassword;
    public pattern_mobile = /^\d{10}$/;


    constructor(private _demoService: DataService, private router: Router, private cookieService: CookieService,  private toastr:ToastsManager) { }

    ngOnInit(): void {
      this._demoService.userTypeVal.subscribe(userType => this.userType = userType)
      this._demoService.cast.subscribe(messageSource => this.messageSource = messageSource)
      this.allCookies = this.cookieService.getAll();
      if(this.allCookies && this.allCookies.rememberMeVal == 'TRUE'){
        this.model.mobile = this.allCookies.mobile;
        this.model.password = this.allCookies.pswd;
        this.rememberMe = true;
      };
 };



    onSubmit() {
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
               console.log(data);
              if(data[0] == "true"){
            if (data[1] == "business") {
              this.showProfile = true;
              this.submitted = true;
              this._demoService.changeProfile('true')
              this.router.navigate(['/', 'userData']);
            }else if(data[1] == 'individual'){
              this._demoService.changeindProfile('true')
              this.router.navigate(['/', 'individualDetails']);
            }else{
              this.toastr.error('Could not login please try again later', 'Error',{toastLife: '5000'});
            }
            }else{
              this.toastr.error('Login failed! Invalid mobile/password', 'Error',{toastLife: '5000'});
            }
            },
            error => {
              this.toastr.error('Login failed! Invalid mobile/password', 'Error',{toastLife: '5000'});
            }
         );
       }

       doesUserExist(val){
         if(val.length == 10){
        this._demoService.doesUserExist({mobile:val}).subscribe(
            data => {
              let res = data;
              console.log(res)
              if (res != undefined && res[0] == 'success') {
                this.errMsg ="Mobile Number does not exist";
              }else if(res != undefined && res[0] == "Mobile Number already exist"){
                  this.errMsg = "";
              }
            },
            error => {
            }
         );
       }
     }

       focusFunction(pristine,valid,val,type){
         if(val == 'focus'){
          this[type] = "focusGreen";
        }
        else if (!pristine && !valid) {
          this[type] = "focusRed";
        }
        if(pristine && (val=='outfocus')){
          this[type] = "";
        }
       }
       validation(){
         if (!this.pattern_mobile.test(this.model.mobile))
                 this.model.mobile = '';
         }

}
