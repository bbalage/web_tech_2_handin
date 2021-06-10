import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { shareReplay, map } from 'rxjs/operators';

interface User {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  cleanLocalStorage() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  login(email: string, password: string) {
    return this.http.post<User>('/api/login/', { email, password })
      .pipe(
        map(res => this.setSession(res),
          shareReplay()
        ));
  }

  private setSession(authResult: any) {
    const now = new Date();
    const expiresAt: Date = new Date(now.setSeconds(now.getSeconds() + authResult.expiresIn));

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt));
  }

  isLoggedIn(): boolean {
    const idToken = localStorage.getItem("id_token");
    if (!idToken) {
      return false;
    }
    const expiration = this.getExpiration();
    if (!expiration) {
      throw Error("No expiration set for idToken");
    }
    const now = new Date();
    return now < expiration;
  }

  isNotLoggedIn(): boolean {
    return !this.isLoggedIn();
  }

  getExpiration(): Date | null {
    const expiration = localStorage.getItem("expires_at");
    if (!expiration) {
      return null;
    }
    const expiresAt: Date = new Date(JSON.parse(expiration));
    return expiresAt;
  }

  logout() {
    this.cleanLocalStorage();
  }
}
