import {Component, OnInit} from '@angular/core';
import {ManagerControlService} from "../service/manager-control.service";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";
import {DataService} from "../service/data.service";
// @ts-ignore
@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit{
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  Group = [''];
  info = {
    acc_name: 'Max',
    group_name: 'No department',
    user_del: 'DEV',
    user_add: 'DEV'
  };
  role = '';
  isLoggedIn = false;
  constructor(
    private managerControlService: ManagerControlService,
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private router: Router,
    private dataService: DataService
  ) {}


  ngOnInit(): void {
    this.role = 'user';
    if (sessionStorage.getItem('manager')){
      this.role = sessionStorage.getItem('manager');
    }
    this.managerControlService.getGroupUsers().subscribe(Group => this.Group = Group);
    this.info.acc_name = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.managerControlService.getGroup().subscribe(response => {
      this.info.group_name = response['Department name'];
      this.info.user_del = response['Department name'];
      this.info.user_add = response['Department name'];
    });
    this.dataService.isLoggedInSubject.subscribe(i => {
      this.isLoggedIn = i;
    });
  }

  Logout() {
    this.authenticationService.logout();
    this.isLoggedIn = false;
    this.dataService.isLoggedInSubject.next(this.isLoggedIn);
    this.router.navigate(['/login']);
  }
  AddUser(val) {
    this.managerControlService.addUserToGroup(val).subscribe(response => {
        if (response) {
          this.managerControlService.getGroupUsers().subscribe(Group => this.Group = Group);
        }
      }
    );
  }
  KickUser(val) {
    this.managerControlService.deleteUserFromGroup(val).subscribe(response => {
        if (response) {
          this.managerControlService.getGroupUsers().subscribe(Group => this.Group = Group);
        }
      }
    );
  }
}
