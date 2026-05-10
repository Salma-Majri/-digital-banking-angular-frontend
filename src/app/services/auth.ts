import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  backendHost: string = "http://localhost:8085";
  isAuthenticated: boolean = false;
  roles: string[] = [];
  username: string | undefined;
  accessToken!: string | null;

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  public login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.post(`${this.backendHost}/auth/login`, params.toString(), { headers });
  }
  public loadProfile(data: any) {
    this.isAuthenticated = true;
    this.accessToken = data['accessToken'];
    localStorage.setItem("token", this.accessToken!);
    this.decodeAndExtractClaims();
  }

  private decodeAndExtractClaims() {
    if (this.accessToken) {
      let decodedToken: any = this.decodeJWT(this.accessToken);
      this.username = decodedToken.sub;
      this.roles = decodedToken.scope.split(" ");
    }
  }

  private decodeJWT(token: string) {
    try {
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (e) {
      return null;
    }
  }

  public loadToken() {
    let token = localStorage.getItem("token");
    if (token) {
      this.accessToken = token;
      this.isAuthenticated = true;
      this.decodeAndExtractClaims();
    }
  }

  public hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  public logout() {
    this.isAuthenticated = false;
    this.accessToken = null;
    this.username = undefined;
    this.roles = [];
    localStorage.removeItem("token");
  }
}
