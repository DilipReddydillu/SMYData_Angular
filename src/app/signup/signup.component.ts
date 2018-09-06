import { Component  } from '@angular/core';
import { DataService } from '../data.service';
import {Observable} from 'rxjs/Rx';
import { FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import {UserDataComponent} from '../user-data/user-data.component'
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
            name: 'Fashion Jewellery',
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
          name: 'TIN',
          id: '3'
        }
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
    patternErr:string;
    showbusinessList:boolean;
    businessList:any;
    idProofErrMsg:string;
    maxLn:number;
    public pattern_email = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    public pattern_mobile = /^\d{10}$/;
    public pattern_pinCode = /^\d{3,7}$/;
    // public pattern_password = /([0-9a-zA-Z]){6,15}/;
    public pattern_password = /^(?=.*?[A-Z])(?=.*?[0-9]).{6,}$/;

    public model = {
        "registrationId": '',
        "ownerName": "",
        "mobile": "",
        "password": "",
        "email": "",
        "businessDetails": [
            {
                "companyName": "",
                "businessAddress": "",
                "pinCode": "",
                "city": "",
                "state": "",
                "country": "",
                "website": "",
                "category": "",
                "regProof": "",
                "reg": "",
                "businessDetailId": ''
            }
        ]
    }
    constructor(private _demoService: DataService, private router: Router,
    private toastr:ToastsManager) {
         }
    ngOnInit() {
      //alert(this.router.url)
      let url = this.router.url;
      this.addNewBusinessForm = url.includes('addNew');
      this.businessEditableForm = url.includes('myInfo');

      if (this.addNewBusinessForm) {
          this.formSubmitName = 'Add Business';
          this.formTitle = 'Add New Business';
          this.addNew = true;
      }else if (this.businessEditableForm) {
          this.showBuList();
      } else {}
    }

    validation(check,value){
      if (!this[check].test(value)) {
        if(check == 'pattern_pinCode'){
          this.model.businessDetails[0].pinCode = ''
        }else{
          this.model[check.slice(8)] = '';
        }
            //  this.toastr.error("Please enter valid "+ check.slice(8), null,{dismiss: 'click',toastLife: '3000'});
        }
      }

    onSubmit() {
      if (this.addNewBusinessForm) {
      this.addNewBusiness(this.model)
    }else if(this.businessEditableForm){
      this.editBusiness(this.model)
    }else{
      this.registerUser(this.model);
      }
      //this.getLocation();
    }
    update(value: string) {
        if (value != null)
            this.addressDetails(value)
    }

    locDeatils(data){
      if (data) {
        var addrDataArr= data.results[0].formatted_address.split(',');
          this.model.businessDetails[0].country = addrDataArr[addrDataArr.length - 1].trim();
          this.model.businessDetails[0].state = addrDataArr[addrDataArr.length - 2].trim();
          this.model.businessDetails[0].city = addrDataArr[addrDataArr.length - 3].trim();
          this.showAddr = true;
      }
    }

    registerUser(dataJson) {
          this.mobileOTP = dataJson.mobile;
          this._demoService.changeMobile(this.mobileOTP);
        this._demoService.registerUser(dataJson).subscribe(
            data => {
                  if (data[0] == 'success') {
                    this.sendOtp(this.mobileOTP )
                    return true;
                  }else{
                    this.toastr.error(data[0], 'Error',{toastLife: '5000'});
                  }
            },
            error => {
                console.error("Error saving data!");
                this.registrationFailed = 'Registration failed';
                this.toastr.error('Registration failed', 'Error',{toastLife: '5000'});
                return Observable.throw(error);
            }
        );
    }
    addNewBusiness(dataJson){
      this._demoService.addingNewBusiness(dataJson).subscribe(
          data => {
              this.toastr.success("successfully added","Success",{toastLife: '5000'});
              this.router.navigate(['/', 'userData','myInfo']);
              return true;
          },
          error => {
              console.error("Error saving data!");
              this.toastr.error("Failed to add", "Error",{toastLife: '5000'});
              this.registrationFailed = 'Failed to add new Business';
              return Observable.throw(error);

          }
      );
    }

    showBuList(){
      this._demoService.viewMyBusiness().subscribe(
         data => {
           this.businessList = data;
           if (this.businessList.businessDetails.length == 1) {
             this.viewBusinessDetails(0)
           } else {
             this.showbusinessList = true;
           }
         },
         error => {
           this.toastr.error("", "ERROR!!",{toastLife: '3000'});
         }
      );
    }
    viewBusinessDetails(index){
      let obj = this.businessList.businessDetails[index];
      this.businessList.businessDetails.splice(index,1);
      this.businessList.businessDetails.unshift(obj);
      this.model= this.businessList
      this.formSubmitName = 'Submit';
      this.formTitle = this.businessList.businessDetails[0].companyName;
      this.showbusinessList = false;
    }

    editBusiness(dataJson){
      this._demoService.editBusinessService(dataJson).subscribe(
          data => {
              this.toastr.success("successfully saved","Success",{toastLife: '5000'});
               this.router.navigate(['/','userData','myInfo']);
          },
          error => {
              console.error("Error saving data!");
              this.toastr.error("Error saving data!", "ERROR!!",{toastLife: '5000'});
              this.registrationFailed = 'Failed to edit Data';
              return Observable.throw(error);
          }
      );
    }

    addressDetails(data) {
        let JsonData = {details: data};
        this._demoService.getLocationDetails(JsonData).subscribe(
            data => {
                this.locDeatils(data);
                return true;
            },
            error => {
                console.error("Error fetching data!");
                this.toastr.error("Error while fetching data!", "ERROR!!",{toastLife: '5000'});
                return Observable.throw(error);
            }
        );
    }

    sendOtp(mobileNum){
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
      this._demoService.doesUserExist({'mobile':mobileNum}).subscribe(
         data => {
           if (data) {
             this.model.mobile = null;
             this.mobilecheck = true;
           }
         },
         error => {
         }
      );
    }

    idProofValidate(proof,id){
      console.log(proof+id)
      this.registerInfo.forEach(function(val){
        if (val.id == proof) proof = val.name;
      })

      switch(proof){
        case "PanCard":
        console.log(!/^([A-Za-z]){5}([0-9]){4}([A-Za-z]){1}$/.test(id))
            if (!/^([A-Za-z]){5}([0-9]){4}([A-Za-z]){1}$/.test(id)){
              this.model.businessDetails[0].regProof = "";
              this.idProofErrMsg = "Please enter valid PanCard number! Ex: AFCDE1234K";
              this.maxLn = 10;
            }
              break;
        case "Aadhar":
            if (!/^\d{12}$/.test(id)){
              this.model.businessDetails[0].regProof = "";
              this.idProofErrMsg = "Please enter valid Aadhar number! Should contain 12 digits";
              this.maxLn = 12;
            }
              break;
        case "TIN":
            if (!/^\d{11}$/.test(id)){
              this.model.businessDetails[0].regProof = "";
              this.idProofErrMsg = "Please enter valid TIN number! Should contain 11 digits";
              this.maxLn = 11;
            }
      }
    }

    getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
}

showPosition(position) {
  alert("Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude);
}

}
