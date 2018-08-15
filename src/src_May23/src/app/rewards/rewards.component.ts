import { Component, OnInit } from '@angular/core';
import {BillingService} from '../billing.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})
export class RewardsComponent implements OnInit {

  constructor(private _billingService: BillingService) { }

  ngOnInit() {
       this.getReward(); // function call to fetch the data
  }
  rewards:any = {
    enable:false, rewardPointEnable:false, bonusPointEnale:false,
    effectiveAmount:'', cashValue:'', bonusPoints:'',
    rewardStartDate:'', rewardEndDate:'', bonusStartDate:'', bonusEndDate:''
  };
  //on save function call
  saveReward(data){
    this.addingReward(data); // function call to save the data
  }

  // function call to save the data
  addingReward(rewardsData){
  console.log(rewardsData);
  //calling addReward method which is inside the billing.service to save the rewards data
    this._billingService.addReward(rewardsData).subscribe(
       data => {
         console.log('success::'+data);
       },
       error => {
       }
    );
  };
  // function call to get the Reward data
  getReward(){
  //calling getReward method which is inside the billing.service to fetch the rewards data
    this._billingService.getReward().subscribe(
       data => {
         console.log('success::'+data)
         if(data != null){
         this.rewards = data;
       }
       },
       error => {
       }
    );
  }

}
