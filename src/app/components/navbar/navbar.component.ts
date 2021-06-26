import { Component, OnInit } from '@angular/core';
import {GestionService} from '../../services/gestion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  error: boolean = false;

  constructor(private gestionService: GestionService, private router: Router) { }

  ngOnInit(): void {
  }

  redirectAdmin(){
    this.gestionService.getNormalUsers().subscribe(data => {
      if(data.status){
        this.error = true;
        setTimeout(() => {
          this.error = false
        }, 2000);
      }else {
          this.router.navigate(['./gestion'])
      }
    });
  }

  logout(){
    localStorage.removeItem("userToken")
    this.router.navigate(['./login'])
  }

}
