import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public loginService: LoginService,
    private router: Router
  ){}
  ngOninit(){
    console.log(this.loginService.getToken());
  }

  logout(): void {
    localStorage.removeItem('authToken'); // Remove token
    this.loginService.loggedInStatus.next(false); // Update login status
  }
  
  showProfile(): void {
    this.router.navigate(['/admin/profile']);

  }

}
