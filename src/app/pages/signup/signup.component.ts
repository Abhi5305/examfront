import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistrationService } from 'src/app/services/registration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  errorMessages: string[] = []; // To store error messages

  constructor(private registrationService : RegistrationService, private snack :MatSnackBar ){};
  public user = {
    username : '',
    password : '',
    firstName : '',
    lastName : '',
    email : '',
    phone :''
  }
  handleError(error: HttpErrorResponse) {
    if (error.error && error.error.errors && Array.isArray(error.error.errors)) {
      return this.errorMessages = error.error.errors.map((err: any) => err.errorMessage); // Extract error messages
    } else {
      return this.errorMessages = ['An unexpected error occurred.'];
    }
  }
  
  submitRegistration(){
    if(this.user.username == '' || this.user.username == null){
      this.snack.open("Username is required",'',{
        duration:2000} );
      return;
    }
    this.registrationService.addUser(this.user).subscribe({ 
      next: (data)=>{
        console.log(data);
        Swal.fire({
          title: 'Success',
          text: data.message,
          icon: 'success',
          confirmButtonText: 'Cool',
          timer: 3000, // 3000ms = 3 seconds
          timerProgressBar: true, // Optional, shows a progress bar          
        })
      },
      error:(error: HttpErrorResponse) => {
        // Extract error messages
        let errorMessages: string[] = [];
        if (error.error && error.error.errors && Array.isArray(error.error.errors)) {
          errorMessages = error.error.errors.map((err: any) => err.errorMessage);
        } else {
          errorMessages = ['An unexpected error occurred.'];
        }
    
        // Combine the messages into a single string
        const errorText = errorMessages.join(' | '); // Combine messages with a separator (e.g., "|")
    
        // Display the error using MatSnackBar
        this.snack.open(errorText, '', {
          duration: 2000,
          panelClass: ['snack-error'] // Add a CSS class for styling
        });
      }   
   });
  }



}
