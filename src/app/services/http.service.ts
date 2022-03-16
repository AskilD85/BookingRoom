import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../model/Room';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private uri = 'http://localhost:5000/api'

  constructor(private http: HttpClient) { }

  getRooms() {
    return this.http.get(`${this.uri}/rooms`);
  }

  bookedRoom(data:Room[] | any) {
    const headers = new HttpHeaders({});
    const formData: FormData = new FormData();
    const dataString = JSON.stringify(data);
    formData.append('data', dataString.toString());
    return this.http.post(`${this.uri}/rooms`, formData, { headers } );
  }

  bookedRoom2(data:Room[] | any ) {
    const headers = new HttpHeaders({});
    const formData: FormData = new FormData();
    const dataString = JSON.stringify(data.rooms);
    formData.append('data', dataString.toString());
    return this.http.post(`${this.uri}/rooms2`, formData, { headers });
  }
}
