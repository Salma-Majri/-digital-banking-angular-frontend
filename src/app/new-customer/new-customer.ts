import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Customer } from '../services/customer';

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-customer.html',
  styleUrl: './new-customer.css'
})
export class NewCustomerComponent implements OnInit {
  newCustomerFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: Customer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(4)]),
      email: this.fb.control('', [Validators.required, Validators.email])
    });
  }

  handleSaveCustomer() {
    if (this.newCustomerFormGroup.invalid) return;

    let customer = this.newCustomerFormGroup.value;

    this.customerService.saveCustomer(customer).subscribe({
      next: (data) => {
        alert("Customer has been successfully saved!");
        this.newCustomerFormGroup.reset();
        this.router.navigateByUrl("/customers");
      },
      error: (err) => {
        console.error("Error saving customer:", err);
      }
    });
  }
}
