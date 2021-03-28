import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../service/data.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute, private router: Router, private dataService: DataService) {

  }

  isLoggedIn = false;

  ngOnInit(): void {
    this.dataService.isLoggedInSubject.subscribe(i => {
      this.isLoggedIn = i;
    });
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    console.log('menu ->' + this.isLoggedIn);
  }

  temp(){
    this.router.navigate(['/templater']);
  }

  settings(){
    this.router.navigate(['/settings']);
  }

  logout() {
    this.authenticationService.logout();
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    this.router.navigate(['/login']);
  }
}
