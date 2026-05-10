import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../services/customer';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class Customers implements OnInit {
  customers: any;
  searchFormGroup!: FormGroup;

  constructor(
    private customerService: Customer,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    });
    this.handleGetCustomers();
  }

  handleGetCustomers() {
    this.customerService.getCustomers().subscribe({
      next: (data: any) => {
        this.customers = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
  handleSearchCustomers() {
    let kw = this.searchFormGroup.value.keyword;
    this.customerService.searchCustomers(kw).subscribe({
      next: (data: any) => {
        this.customers = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error("Error searching customers:", err);
      }
    });
  }

    handleDeleteCustomer(c: any) {
      let conf = confirm("Are you sure you want to delete this customer?");
      if (!conf) return;
      this.customerService.deleteCustomer(c.id).subscribe({
        next: () => {
          this.customers = this.customers.filter((cust: any) => cust.id !== c.id);
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          console.error("Error deleting customer:", err);
          alert("Cannot delete this customer because they have active bank accounts!");
        }
      });
    }

}
