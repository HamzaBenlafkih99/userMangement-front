import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { User } from '../../models/User'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    Username: '',
    Password: '',
    Role: ''
  }
  erreur: boolean = false;
  login:boolean = true;
  @ViewChild('userForm') form: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("userToken")){
      this.router.navigate(['./'])
    }
  }

  onSubmit({value, valid}: {value: User, valid: boolean}) {
    if(!valid){
      console.log('Form is not valid');
    } else {
      this.authService.saveUser({
        Username: value.Username,
        Password: value.Password
      }).subscribe(res => {
        if(res.status){
           this.erreur = true;
           setTimeout(() => {
            this.erreur = false;
          }, 2000);
        }else {
          localStorage.setItem("userToken", res.token);
          this.router.navigate(['./']);
        }
      });
      this.form.reset();
    }
  }

}
