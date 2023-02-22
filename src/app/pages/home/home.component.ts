import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  user = null;
  role: any ;

  constructor(public login: LoginService ,private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.role = this.login.getUserRole();
    this.login.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
      this.role = this.login.getUserRole();
    });
  }
  redirectToRole(){
    if (this.role=="ADMIN") {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/user-dashboard']);
    }
  }

}
