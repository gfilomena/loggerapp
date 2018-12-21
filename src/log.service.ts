import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


//const apiDNSlookup = 'https://repl.it/@gfilomena/ResolveDNSbyIP';
const apiDNSlookup ='http://localhost:4000';
@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient) {}



  getLog() {
    return this.http.get('/assets/IISLog.log', {responseType: 'text'});
  }

  getFqdn(data) {
    return this.http.post(apiDNSlookup+'/dnslookups', data);
  }
}
