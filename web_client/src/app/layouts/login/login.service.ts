import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  host = environment.hostApi;
  
  constructor(private _http: HttpClient) { }

  login<TokenModel>(username, password) {
    let headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic '+ btoa("app_erp:app_erp")
    });
    let options = {
        headers: headers
    };
    const d = 'username=' + username + '&password=' + password + '&grant_type=password&client_id=app_erp';
    return this._http.post<TokenModel>(this.host + '/oauth/token', d, options);
  }
  logOut(){
    localStorage.removeItem(environment.keyLocalStorage);
  }

  signup<ResponseUtil>(data){
    let headers = new HttpHeaders({
      'Authorization': 'Basic '+ btoa("app_erp:app_erp")
    });
    let options = {
      headers: headers
    };
    return this._http.post<ResponseUtil>(this.host + '/auth/signup', data, options);
  }
}
