import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Customer {
  private backendHost = "http://localhost:8085";

  constructor(private http: HttpClient) {}

  public getCustomers(): Observable<any> {
    return this.http.get(`${this.backendHost}/customers`);
  }

  public saveCustomer(customer: any): Observable<any> {
    return this.http.post(`${this.backendHost}/customers`, customer);
  }

  public searchCustomers(keyword: string): Observable<any> {
    return this.http.get(`${this.backendHost}/customers/search?keyword=${keyword}`);
  }
}
