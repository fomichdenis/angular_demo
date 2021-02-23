import { Component } from '@angular/core';

// @ts-ignore
@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent {
  info = {
    acc_name: 'Max',
    group_name: 'DEV',
    user_del: 'DEV',
    user_add: 'DEV'
  };

  Group = ['Max', 'Andrey', 'Denis', 'Ylia'];
  Logout() {}
  Adduser(val) {}
  Kickuser(val) {}
}
