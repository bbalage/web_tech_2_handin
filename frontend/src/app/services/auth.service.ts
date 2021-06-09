import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  login(email: string, password: string) {
    return this.http.post<User>('/api/login/', { email, password })
      .pipe(
        map(res => this.setSession(res),
          shareReplay()
        ));
  }

  private setSession(authResult: any) {
    const now = new Date();
    const expiresAt = now.setSeconds(now.getSeconds() + authResult.expiresIn * 1000);

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
    return new Date() < expiration;
  }

  getExpiration(): Date | null {
    const expiration = localStorage.getItem("expires_at");
    if (!expiration) {
      return null;
    }
    const expiresAt = JSON.parse(expiration);
    return expiresAt;
  }
}
