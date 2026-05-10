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


  public deleteCustomer(id: number): Observable<any> {
      return this.http.delete(`${this.backendHost}/customers/${id}`);
    }

  public getAccount(accountId: string, page: number, size: number): Observable<any> {
      return this.http.get(`${this.backendHost}/accounts/${accountId}/pageOperations?page=${page}&size=${size}`);
  }



    public debit(accountId: string, amount: number, description: string): Observable<any> {
      let data = { accountId: accountId, amount: amount, description: description };
      return this.http.post(`${this.backendHost}/accounts/debit`, data);
    }

    public credit(accountId: string, amount: number, description: string): Observable<any> {
      let data = { accountId: accountId, amount: amount, description: description };
      return this.http.post(`${this.backendHost}/accounts/credit`, data);
    }

    public transfer(source: string, destination: string, amount: number, description: string): Observable<any> {
      let data = { accountSource: source, accountDestination: destination, amount: amount, description: description };
      return this.http.post(`${this.backendHost}/accounts/transfer`, data);
    }


}
