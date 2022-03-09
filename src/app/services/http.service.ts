import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../model/Room';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  uri = 'http://localhost:5000/api'

  constructor(private http: HttpClient) { }

  getRooms() {
    return this.http.get(`${this.uri}/rooms`);
  }
}
