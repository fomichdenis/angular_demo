import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {TopBarComponent} from "../top-bar/top-bar.component";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private router: Router
  ) { }
  credentials = {username: '', password: ''};
  error = false;
  ngOnInit(): void {
  }

  loginUser() {
    console.log('login = ' + this.credentials.username + ", password = " + this.credentials.password);
    this.authenticationService.authenticate(this.credentials, () => {
      this.router.navigate(['/templater']);
    });
    setTimeout( () => { this.error = true}, 500);
  }

}
