import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {TopBarComponent} from "../top-bar/top-bar.component";
import {RegistrationService} from "../service/registration.service";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registrtaion-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  constructor(
    private registrationService: RegistrationService,
    private http: HttpClient,
    private router: Router,
  ) { }
  credentials = {username: '', password: '', confirmationPassword: ''};
  ngOnInit(): void {
  }

  Registrate() {
    console.log(this.credentials)
    this.registrationService.registrate(this.credentials, () => {
      this.router.navigate(['/login']);
    });
    return false;
  }
  Login(){
    this.router.navigate(['/login']);
  }
}
