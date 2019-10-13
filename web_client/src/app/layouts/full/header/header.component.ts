import { Component } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  constructor(
    private loginService: LoginService,
    private router: Router
  ){}
  logout(){
    this.loginService.logOut();
    this.router.navigateByUrl('/login');
  }
}
