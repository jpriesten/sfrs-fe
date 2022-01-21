import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Group, UserGroups } from 'src/app/models/user-groups';
import { CoreService } from 'src/app/services/core.service';
import { IdapService } from 'src/app/services/idap.service';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.scss'],
})
export class UserGroupsComponent implements OnInit {
  loadingData = false;
  userGroups = new UserGroups();

  public selectedGroupRows: any[] = [];
  public currentGroupsSelector = null;
  public selectedGroupsChangedBySelectbox = false;

  constructor(public core: CoreService, private idapService: IdapService) {}

  ngOnInit(): void {
    this.getUserGroups();
  }

  groupSelected(selected: any) {
    // console.log('Selected group: ', selected);
  }

  getUserGroups() {
    this.loadingData = true;
    this.idapService
      .getGroups()
      .then((response) => {
        this.loadingData = false;
        this.userGroups = response;
        console.log('User groups: ', this.userGroups);
      })
      .catch((error) => {
        this.loadingData = false;
      });
  }
}
