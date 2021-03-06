import { Component, Input, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { InfrasysService } from 'src/app/services/infrasys.service';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
})
export class SitesComponent implements OnInit {
  loadingData = false;
  unauthorisedDashboard = { authorised: true, description: '' };

  public sites: any[] = [];
  public selectedRows: any[] = [];

  constructor(
    public core: CoreService,
    private infrasysService: InfrasysService
  ) {}

  ngOnInit(): void {
    this.getSites();
  }

  getSites() {
    this.loadingData = true;
    this.infrasysService
      .getSites()
      .then((response) => {
        this.loadingData = false;
        this.unauthorisedDashboard.authorised = true;
        this.sites = response.data.sites;
      })
      .catch((error) => {
        this.loadingData = false;
        this.unauthorisedDashboard =
          this.core.getUnauthorisedErrorMessage(error);
      });
  }
}
