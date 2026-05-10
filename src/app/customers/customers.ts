import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class Customers implements OnInit {
  customers: any;
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.http.get("http://localhost:8085/customers").subscribe({
      next: (data) => {
        this.customers = data;
        console.log("Data received:", data);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error fetching customers:", err);
      }
    });
  }
}
