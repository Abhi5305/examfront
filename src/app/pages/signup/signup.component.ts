import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private userService : UserService, private snack :MatSnackBar ){};
  public user = {
    userName : '',
    password : '',
    firstName : '',
    lastName : '',
    email : '',
    phone :''
  }
  
  submitRegistration(){
    if(this.user.userName == '' || this.user.userName == null){
      this.snack.open("Username is required",'',{
        duration:2000} );
      return;
    }
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        console.log(data);
        Swal.fire({
          title: 'Success !!',
          text: 'User is Registered !!',
          icon: 'success',
          confirmButtonText: 'Cool'
        })
      },
      (error)=>{
        console.log(error);
        this.snack.open("Can't register",'',{
          duration:2000} );
      }
      );
  }



}
