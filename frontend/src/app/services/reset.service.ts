import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  constructor(private http: HttpClient) { }

  reset() {
    console.log("RESETING");
    this.http.get<void>('/api/reset').toPromise();
  }
}
