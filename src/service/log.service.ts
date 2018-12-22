import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LogService {

  uri: string = environment.serviceUrl;
  logpath: string = '/assets/IISLog.log';

  constructor(private http: HttpClient) { }

  getLog() {
    return this.http.get(this.logpath, { responseType: 'text' });
  }

  getFqdn(data) {
    return this.http.post(this.uri + '/dnslookups', data);
  }
}
