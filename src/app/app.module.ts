import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {ToastModule} from 'ng5-toastr/ng5-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule,MatPaginatorModule,MatSortModule } from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {MatInputModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AgGridModule} from 'ag-grid-angular';
import { DataTableModule } from 'angular5-data-table';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserDataComponent } from './user-data/user-data.component';
import { DataService } from './data.service';
import { BillingService } from './billing.service';
import {IndividualService} from './individual.service';
import { OtpAuthenticationComponent } from './otp-authentication/otp-authentication.component';
import { RewardsComponent } from './rewards/rewards.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SelectInvoiceComponent } from './select-invoice/select-invoice.component';
import { PayablesComponent } from './payables/payables.component';
import { ReceivablesComponent } from './receivables/receivables.component';
import { RaiseTicketComponent } from './raise-ticket/raise-ticket.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { IndividualRegistrationComponent } from './individual-registration/individual-registration.component';
import { SelectLoginTypeComponent } from './select-login-type/select-login-type.component';
import { IndividualDetailsComponent } from './individual-details/individual-details.component';
import { IndividualReceivablesComponent } from './individual-receivables/individual-receivables.component';
import { IndividualPayablesComponent } from './individual-payables/individual-payables.component';
import { IndividualReportsComponent } from './individual-reports/individual-reports.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuard } from './auth-guard/auth-guard';
import { RegisterComponent } from './register/register.component';
import { BusinessUsersComponent } from './business-users/business-users.component';
import { IndividualUsersComponent } from './individual-users/individual-users.component';
import { InvoiceGenerationComponent } from './invoice-generation/invoice-generation.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SignInComponent,
    UserDataComponent,
    OtpAuthenticationComponent,
    RewardsComponent,
    DiscountsComponent,
    InvoiceComponent,
    SelectInvoiceComponent,
    PayablesComponent,
    ReceivablesComponent,
    RaiseTicketComponent,
    SalesReportComponent,
    IndividualRegistrationComponent,
    SelectLoginTypeComponent,
    IndividualDetailsComponent,
    IndividualReceivablesComponent,
    IndividualPayablesComponent,
    IndividualReportsComponent,
    LandingPageComponent,
    RegisterComponent,
    BusinessUsersComponent,
    IndividualUsersComponent,
    InvoiceGenerationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CdkTableModule,
    MatInputModule,
    MatTooltipModule,
    AppRoutingModule,Ng2SmartTableModule,
    AgGridModule.withComponents([]),
    DataTableModule.forRoot(),
    ToastModule.forRoot()
  ],
  providers: [CookieService, DataService, BillingService,IndividualService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
