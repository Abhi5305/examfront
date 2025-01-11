import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public loginService: LoginService){}
  ngOninit(){
    console.log(this.loginService.getToken());
  }

  logout(): void {
    localStorage.removeItem('authToken'); // Remove token
    this.loginService.loggedInStatus.next(false); // Update login status
  }

}
