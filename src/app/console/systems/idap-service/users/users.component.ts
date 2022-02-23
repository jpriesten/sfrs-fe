import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { IdapService } from 'src/app/services/idap.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  usersData: any = {};
  users = [];
  loadingData = false;
  unauthorisedDashboard = { authorised: true, description: '' };

  public selectedRows: any[] = [];

  constructor(public core: CoreService, private idapService: IdapService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(maxItems?: number, marker?: string) {
    this.loadingData = true;
    this.idapService
      .getUsers(maxItems, marker)
      .then((response) => {
        this.loadingData = false;
        this.unauthorisedDashboard.authorised = true;
        this.users = response.data.users;
        this.usersData = response.data;
        console.log(this.users);
      })
      .catch((error) => {
        this.loadingData = false;
        this.unauthorisedDashboard =
          this.core.getUnauthorisedErrorMessage(error);
      });
  }

  onSelectionChanged(maxItems: number) {
    this.getUsers(maxItems);
  }

  onNextPage(nextPageData: any) {
    this.getUsers(nextPageData.maxItems, nextPageData.marker);
  }

  onPreviousPage(previousPageData: any) {
    this.getUsers(previousPageData.maxItems, previousPageData.marker);
  }
}
