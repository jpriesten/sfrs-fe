import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { IdapService } from 'src/app/services/idap.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users = [];
  loadingData = false;

  public selectedRows: any[] = [];

  constructor(public core: CoreService, private idapService: IdapService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.loadingData = true;
    this.idapService
      .getUsers()
      .then((response) => {
        this.loadingData = false;
        this.users = response.data.users;
        console.log(this.users);
      })
      .catch((error) => {
        this.loadingData = false;
      });
  }
}
