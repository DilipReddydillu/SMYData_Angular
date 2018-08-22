import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import { DataService } from '../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-individual-registration',
  templateUrl: './individual-registration.component.html',
  styleUrls: ['./individual-registration.component.css']
})
export class IndividualRegistrationComponent implements OnInit {
  public pattern_email = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  public pattern_mobile = /([0-9]){10}/g;
  public pattern_password = /([0-9a-zA-Z]){6,20}/g;
  public model = {
       "userName": "",
       "userMobile": "",
       "password": "",
       "email": "",
       "role":"individual"
     }
  constructor(  private toastr:ToastsManager,private _demoService: DataService, private router: Router) { }

  ngOnInit() {
  }

  validation(check,value){
    if (!this[check].test(value)) {
            this.model[check.slice(8)] = '';
            this.toastr.error("Please enter valid "+ check.slice(8), null,{toastLife: '3000'});
      }
    }

    registerUser(dataJson) {
      console.log(dataJson)
        //  this.mobileOTP = dataJson.mobile;
        this._demoService.registerIndividual(dataJson).subscribe(
            data => {
                console.log(data)
                  console.log("Data saved successfully!");
                  if (data[0] == 'success') {
                    alert("success");
                    this.router.navigate(['/', 'signIn']);

                    //this.sendOtp(  this.mobileOTP )
                    return true;
                  }else{
                    this.toastr.error(data[0], 'Error',{toastLife: '5000'});
                  }
            },
            error => {
                console.error("Error saving data!");
              //  this.registrationFailed = 'Registration failed';
                this.toastr.error('Registration failed', 'Error',{toastLife: '5000'});
              //  return Observable.throw(error);
            }
        );
    }

}
