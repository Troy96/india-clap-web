import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceCenterRoutingModule } from './finance-center-routing.module';
import { FinanceCenterComponent } from './finance-center.component';
import { FinanceCentreLoanApplyComponent } from './finance-centre-loan-apply/finance-centre-loan-apply.component';
import { FinanceCentreLoanProvidersComponent } from './finance-centre-loan-providers/finance-centre-loan-providers.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PendingApplicationComponent } from './pending-application/pending-application.component';
import { YourLoanApplicationsComponent } from './your-loan-applications/your-loan-applications.component';
import { LoanApplicationComponent } from './loan-application/loan-application.component';


@NgModule({
  declarations: [
    FinanceCenterComponent,
    FinanceCentreLoanApplyComponent,
    FinanceCentreLoanProvidersComponent,
    PendingApplicationComponent,
    YourLoanApplicationsComponent,
    LoanApplicationComponent
  ],
  imports: [
    CommonModule,
    FinanceCenterRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FinanceCenterModule { }
