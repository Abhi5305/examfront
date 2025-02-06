import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user = {
    userId: '',
    username : '',
    password : '',
    firstName : '',
    lastName : '',
    roles : '',
    email : '',
    phone :'',
    status : ''
  }
  constructor(private loginService:LoginService){}

  ngOnInit(): void{
    this.user = this.loginService.getUser();
  }

}
