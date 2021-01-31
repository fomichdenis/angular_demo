import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {TopBarComponent} from "../top-bar/top-bar.component";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registrtaion-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private router: Router
  ) { }
  credentials = {username: '', password: ''};
  ngOnInit(): void {
  }

  Registrate() {
    return false;
  }

}
