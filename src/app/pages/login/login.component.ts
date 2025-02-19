import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credential = {
    username : '',
    password : '',
  };
  constructor(private loginService : LoginService, 
    private snack:MatSnackBar,
  private router: Router){}
  submitLoginCredentials(){
    if(this.credential.username.trim() == '' || this.credential.username == null){
      this.snack.open('username is required!','',{
        duration : 3000,
      })
      return;
    }
    if(this.credential.password.trim() == '' || this.credential.password == null){
      this.snack.open('password is required!','',{
        duration : 3000,
      })
      return;
    }
    this.loginService.generateToken(this.credential).subscribe({
      next: (data:any) =>{
        console.log("Success")
        console.log(data)
        
        this.loginService.login(data.token)
        console.log(data.token)

        this.loginService.getCurrentUser().subscribe({
          next: (user)=>{
            this.loginService.saveUser(user)
            console.log(user)
            const roles = this.loginService.getUserRoles();

            if (roles.includes("ROLE_ADMIN")||roles.includes("ADMIN")) {
              console.log("User has ROLE_ADMIN");
              this.router.navigate(['/admin']);
              // Perform actions specific to ROLE_ADMIN
            } else if (roles.includes("ROLE_USER")) {
              console.log("User has ROLE_USER");
              this.router.navigate(['/user/0']);
              // Perform actions specific to ROLE_USER
            } else {
              console.log("User has no valid role");
              this.loginService.logout();
              // Handle cases where no recognized role is present
            }          
          }
        });
      },
      error: (error) =>{
        console.log(error)
        this.snack.open("facing issues while logging in Please provide valid credentials!!","",{
          duration: 3000,
        })
      }
    });
  }
}
