import { Routes } from '@angular/router';
import { Customers } from "./customers/customers";
import { Accounts } from "./accounts/accounts";
import { NewCustomerComponent } from "./new-customer/new-customer";
import { LoginComponent } from "./login/login";

export const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "customers", component: Customers },
  { path: "accounts", component: Accounts },
  { path: "new-customer", component: NewCustomerComponent },
];
