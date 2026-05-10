import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../services/customer';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class Customers implements OnInit {
  customers: any;

  constructor(private customerService: Customer, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe({
      next: (data: any) => {
        this.customers = data;
        console.log("Data received via Service:", data);
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error("Error fetching customers:", err);
      }
    });
  }
}
