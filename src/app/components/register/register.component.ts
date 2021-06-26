import { Component, OnInit, ViewChild } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { User } from '../../models/User'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = {
    Username: '',
    Password: '',
    Role: ''
  }
  success: boolean = false;
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
      this.authService.signUpUser(value).subscribe(res => {
        if(res.status){
           this.success = true;
           setTimeout(() => {
            this.success = false;
            this.router.navigate(['./login']);
          }, 1000);
        }else {
          localStorage.setItem("userToken", res.token);
          this.router.navigate(['./']);
        }
      });
      this.form.reset();
    }
  }

}
