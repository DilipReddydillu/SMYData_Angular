import { Component } from '@angular/core';
import { DataService } from '../data.service';
import {Observable} from 'rxjs/Rx';
import { FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import {UserDataComponent} from '../user-data/user-data.component'
//import { google } from 'google/googleMap';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    categoryInfo = [{
            name: 'Clothing',
            id: '1'
        },
        {
            name: 'Furniture',
            id: '2'
        },
        {
            name: 'Fashion jewellery',
            id: '3'
        },
        {
            name: 'Valves',
            id: '4'
        },
        {
            name: 'Computer Hardware',
            id: '5'
        },
    ];
    registerInfo = [{
            name: 'PanCard',
            id: '1'
        },
        {
            name: 'Aadhar',
            id: '2'
        },
        {
            name: 'LabourId',
            id: '3'
        },
        {
            name: 'TIN',
            id: '4'
        },
        {
            name: 'RegId',
            id: '5'
        },
    ];

    submitted = false;
    showAddr = false;
    registrationFailed =null;
    latlng:any;
    mobileOTP:any;
    addNewBusinessForm:boolean;
    formSubmitName:String = 'Register';
    formTitle : String = 'Registration Form';
    businessEditableForm:any;
    addNew:boolean;
    mobilecheck:boolean;

    public model={"companyName":"","ownerName":"","mobile":"","password":"","email":"","businessAddress":"","pinCode":"","city":"","state":"","country":"","website":"","category":"","regProof":"","reg":""};

    constructor(private _demoService: DataService, private router: Router) {}
    ngOnInit() {
      this._demoService.newBusinessVal.subscribe(newBusinessVal => this.addNewBusinessForm = newBusinessVal);
      this._demoService.editBusinessDetails.subscribe(editBusinessDetails => this.businessEditableForm = editBusinessDetails);
      console.log(this.addNewBusinessForm);
      console.log(this.businessEditableForm)
      if (this.addNewBusinessForm) {
          this.formSubmitName = 'Add Business';
          this.formTitle = 'Add New Business';
          this.addNew = true;
      }else if (this.businessEditableForm) {
        console.log(this.businessEditableForm)
          this.formSubmitName = 'Submit';
          this.formTitle = this.businessEditableForm.companyName;
          this.model = this.businessEditableForm;
      } else {}
      console.log('newBusinessVal::'+this.addNewBusinessForm);
    }

    onSubmit() {
      if (this.addNewBusinessForm) {
          console.log('newBusinessVal::'+this.addNewBusinessForm);
          console.log(this.model)
            console.log('addNew comp.ts')
      this.addNewBusiness(this.model)
    }else if(this.businessEditableForm){
      console.log(this.model)
        console.log('edit comp.ts')
      this.editBusiness(this.model)
    }else{
      this.registerUser(this.model);
      console.log('register comp.ts')
        console.log(JSON.stringify(this.model));
      }
    }
    update(value: string) {
        if (value != null)
            this.addressDetails(value)
    }

    locDeatils(data){
      if (data) {
        var addrDataArr= data.results[0].formatted_address.split(',');
          this.model['country'] = addrDataArr[addrDataArr.length - 1].trim();
          this.model['state'] = addrDataArr[addrDataArr.length - 2].trim();
          this.model['city'] = addrDataArr[addrDataArr.length - 3].trim();
          this.showAddr = true;
      }
    }

    registerUser(dataJson) {
          this.mobileOTP = dataJson.mobile;
        this._demoService.registerUser(dataJson).subscribe(
            data => {
                console.log("Data saved successfully!");
                  this.sendOtp(  this.mobileOTP )
                return true;
            },
            error => {
                console.error("Error saving data!");
                this.registrationFailed = 'Registration failed';
                return Observable.throw(error);
            }
        );
    }
    addNewBusiness(dataJson){
      this._demoService.addingNewBusiness(dataJson).subscribe(
          data => {
              console.log("Data saved successfully!");
              return true;
          },
          error => {
              console.error("Error saving data!");
              this.registrationFailed = 'Failed to add new Business';
              return Observable.throw(error);

          }
      );
    }

    editBusiness(dataJson){
      this._demoService.editBusinessService(dataJson).subscribe(
          data => {
              console.log("Data saved successfully!");
              return true;
          },
          error => {
              console.error("Error saving data!");
              this.registrationFailed = 'Failed to edit Data';
              return Observable.throw(error);

          }
      );
    }

    addressDetails(data) {
        let JsonData = {details: data};
        this._demoService.getLocationDetails(JsonData).subscribe(
            data => {
                console.log(data)
                this.locDeatils(data);
                return true;
            },
            error => {
                console.error("Error fetching data!");
                return Observable.throw(error);
            }
        );
    }

    sendOtp(mobileNum){
        console.log('send otp comp.ts'+ mobileNum)
          this.router.navigate(['/', 'otpVerification']);
          this._demoService.sendOtp(mobileNum).subscribe(
             data => {
               this._demoService.changeMessage(data+'Regi')
             },
             error => {
             }
          );
    }

    doesUserExist(mobileNum){
      console.log("mobile:"+mobileNum)
      this._demoService.doesUserExist({'mobile':mobileNum}).subscribe(
         data => {
           console.log("hehehe")
           if (data) {
             console.log("data:"+data)
             this.model.mobile = null;
             this.mobilecheck = true;
           }
         },
         error => {

         }
      );
    }

}
