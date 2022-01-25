import { Component, OnInit } from '@angular/core';
import { AccountSummary } from 'src/app/models/account-summary.model';
import { CoreService } from 'src/app/services/core.service';
import { IdapService } from 'src/app/services/idap.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  loadingData = false;
  accountSummary = new AccountSummary();
  constructor(public core: CoreService, private idapService: IdapService) {}

  ngOnInit(): void {
    this.getAccountSummary();
  }

  getAccountSummary() {
    this.loadingData = true;
    this.idapService
      .getAccountSummary()
      .then((response) => {
        this.loadingData = false;
        this.accountSummary = response;
        console.log('Dashboard: ', this.accountSummary);
      })
      .catch((error) => {
        console.error('Dashboard error: ', error);
        this.loadingData = false;
      });
  }
}
