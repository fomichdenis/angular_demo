import {Component, OnInit} from '@angular/core';
import {ManagerControlService} from "../service/manager-control.service";
import {HttpClient} from "@angular/common/http";
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
    group_name: 'DEV',
    user_del: 'DEV',
    user_add: 'DEV'
  };
  role = '';
  constructor(
    private managerControlService: ManagerControlService,
    private http: HttpClient
  ) {}


  ngOnInit(): void {
    this.role = 'user';
    if (sessionStorage.getItem('manager')){
      this.role = 'manager';
    }
    this.managerControlService.getGroupUsers().subscribe(Group => this.Group = Group);
    this.info.acc_name = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.managerControlService.getGroup().subscribe(response => {
      this.info.group_name = response['Department name'];
      this.info.user_del = response['Department name'];
      this.info.user_add = response['Department name'];
    });
  }

  Logout() {}
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
