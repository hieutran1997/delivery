import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { TokenModel } from '../../model';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UserDto } from '../../model';
import { ResponseUtil } from '../../model/ResponseUtil';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  token: TokenModel;
  user: String;
  password: String;
  _regUserName: String;
  _regPassword: String;
  _regRepeatPassword: String;
  _regFirstName: String;
  _regLastName: String;
  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (localStorage.getItem(environment.keyLocalStorage)) {
      this.router.navigateByUrl('/');
    }
  }

  login() {
    if (!this.user || !this.password) {
      alert('Vui lòng nhập lại thông tin tài khoản');
      return;
    } else {
      this.loginService.login<TokenModel>(this.user, this.password).subscribe(data => {
        if (data) {
          if (data.access_token) {
            let obj = JSON.stringify(data);
            localStorage.setItem(environment.keyLocalStorage, obj);
            this.router.navigateByUrl('/');
          }
        }
      });
    }
  }

  signup(){
    var obj = {
      username: this._regUserName,
      lastname: this._regLastName,
      firstname: this._regFirstName,
      password: this._regPassword
    };
    this.loginService.signup<ResponseUtil<UserDto>>(obj).subscribe(res=>{
      if(res.error){
        alert(res.message);
      }
      else{
        alert("Đăng ký thành công!");
      }
    })
  }
 }
