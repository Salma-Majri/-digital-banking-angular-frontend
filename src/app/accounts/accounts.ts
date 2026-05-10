import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer } from '../services/customer';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './accounts.html',
  styleUrl: './accounts.css'
})
export class Accounts implements OnInit {
  accountFormGroup!: FormGroup;
  operationFormGroup!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 5;
  accountDetails: any;

  constructor(
    private fb: FormBuilder,
    private customerService: Customer,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control('')
    });

    this.operationFormGroup = this.fb.group({
      operationType: this.fb.control('DEBIT'),
      amount: this.fb.control(0, [Validators.required, Validators.min(1)]),
      description: this.fb.control(''),
      accountDestination: this.fb.control('')
    });
  }

  handleSearchAccount() {
    let accountId = this.accountFormGroup.value.accountId;
    this.customerService.getAccount(accountId, this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.accountDetails = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        alert("Account not found!");
      }
    });
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }

  handleAccountOperation() {
    let accountId = this.accountFormGroup.value.accountId;
    let operationType = this.operationFormGroup.value.operationType;
    let amount = this.operationFormGroup.value.amount;
    let description = this.operationFormGroup.value.description;
    let accountDestination = this.operationFormGroup.value.accountDestination;

    if (operationType === 'DEBIT') {
      this.customerService.debit(accountId, amount, description).subscribe({
        next: () => {
          alert("Success Debit!");
          this.operationFormGroup.reset({ operationType: 'DEBIT', amount: 0, description: '' });
          this.handleSearchAccount();
        },
        error: (err) => console.error(err)
      });
    } else if (operationType === 'CREDIT') {
      this.customerService.credit(accountId, amount, description).subscribe({
        next: () => {
          alert("Success Credit!");
          this.operationFormGroup.reset({ operationType: 'CREDIT', amount: 0, description: '' });
          this.handleSearchAccount();
        },
        error: (err) => console.error(err)
      });
    } else if (operationType === 'TRANSFER') {
      this.customerService.transfer(accountId, accountDestination, amount, description).subscribe({
        next: () => {
          alert("Success Transfer!");
          this.operationFormGroup.reset({ operationType: 'TRANSFER', amount: 0, description: '', accountDestination: '' });
          this.handleSearchAccount();
        },
        error: (err) => console.error(err)
      });
    }
  }
}
