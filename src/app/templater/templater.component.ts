import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'app-templater',
  templateUrl: './templater.component.html',
  styleUrls: ['./templater.component.css']
})
export class TemplaterComponent implements OnInit {

  constructor( private backend: AuthenticationService) { }

  ngOnInit(): void {

  }
  test() {
    console.log(this.backend.isUserLoggedIn());
  }
}
