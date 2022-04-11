import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser:User;
  constructor(private authService:AuthService) { 
    if(localStorage.getItem('isLoggedIn')){
     this.currentUser=this.authService.userValue;
     }    
  }
  ngOnInit(): void {
  }
}
