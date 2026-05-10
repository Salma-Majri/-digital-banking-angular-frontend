import { Routes } from '@angular/router';
import {Customers } from "./customers/customers";
import { Accounts } from "./accounts/accounts";
import { NewCustomerComponent } from "./new-customer/new-customer";
export const routes: Routes = [
 { path: "customers", component: Customers },
   { path: "accounts", component: Accounts },
   { path: "new-customer", component: NewCustomerComponent },

];
