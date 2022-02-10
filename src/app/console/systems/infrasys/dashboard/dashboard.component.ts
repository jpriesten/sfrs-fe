import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { InfrasysService } from 'src/app/services/infrasys.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  loadingData = false;
  unauthorisedDashboard = { authorised: true, description: '' };

  public siteSummary: any = {};

  constructor(
    public core: CoreService,
    private infrasysService: InfrasysService
  ) {}

  ngOnInit(): void {
    this.getSiteSummary();
  }

  getSiteSummary() {
    this.loadingData = true;
    this.infrasysService
      .getSiteSummary()
      .then((response) => {
        this.loadingData = false;
        this.unauthorisedDashboard.authorised = true;
        this.siteSummary = response.data;
      })
      .catch((error) => {
        this.loadingData = false;
        this.unauthorisedDashboard =
          this.core.getUnauthorisedErrorMessage(error);
      });
  }
}
