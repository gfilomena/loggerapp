import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LogService {

  uri: String = environment.serviceUrl;

  constructor(private http: HttpClient) { }

  getLog() {
    return this.http.get('/assets/IISLog.log', { responseType: 'text' });
  }

  getFqdn(data) {
    return this.http.post(this.uri + '/dnslookups', data);
  }
}
