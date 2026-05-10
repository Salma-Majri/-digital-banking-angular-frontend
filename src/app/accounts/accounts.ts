import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  }

  handleSearchAccount() {
    let accountId = this.accountFormGroup.value.accountId;

    this.customerService.getAccount(accountId, this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.accountDetails = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error fetching account details:", err);
        alert("Account not found!");
      }
    });
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }
}
