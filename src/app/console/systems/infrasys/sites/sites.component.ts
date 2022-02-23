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
  public sitesData: any = {};
  public selectedRows: any[] = [];

  constructor(
    public core: CoreService,
    private infrasysService: InfrasysService
  ) {}

  ngOnInit(): void {
    this.getSites();
  }

  getSites(maxItems?: number, marker?: string) {
    this.loadingData = true;
    this.infrasysService
      .getSites(maxItems, marker)
      .then((response) => {
        this.loadingData = false;
        this.unauthorisedDashboard.authorised = true;
        this.sites = response.data.sites;
        this.sitesData = response.data;
      })
      .catch((error) => {
        this.loadingData = false;
        this.unauthorisedDashboard =
          this.core.getUnauthorisedErrorMessage(error);
      });
  }

  onSelectionChanged(maxItems: number) {
    this.getSites(maxItems);
  }

  onNextPage(nextPageData: any) {
    this.getSites(nextPageData.maxItems, nextPageData.marker);
  }

  onPreviousPage(previousPageData: any) {
    this.getSites(previousPageData.maxItems, previousPageData.marker);
  }
}
