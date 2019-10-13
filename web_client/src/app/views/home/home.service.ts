import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDto } from '../../model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  host = environment.hostApi;

  constructor(
    private _http: HttpClient
  ) { }

  getAllUser<Array>(){
    return this._http.get<Array>(this.host + '/users/user');
  }

  deleteUser<ResponseUtil>(user){
    return this._http.delete<ResponseUtil>(this.host + '/users/user/'+user.id);
  }
}
