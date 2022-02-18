import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { InfrasysService } from 'src/app/services/infrasys.service';

@Component({
  selector: 'app-facility-details',
  templateUrl: './facility-details.component.html',
  styleUrls: ['./facility-details.component.scss'],
})
export class FacilityDetailsComponent implements OnInit {
  public loadingData = false;

  public siteData: any = {};
  public siteFacility: any = {};

  constructor(
    public core: CoreService,
    private route: ActivatedRoute,
    private router: Router,
    private infrasysService: InfrasysService
  ) {}

  ngOnInit(): void {
    this.getFacilityDetails(
      this.route.snapshot.paramMap.get('siteId'),
      this.route.snapshot.paramMap.get('facilityId')
    );
  }

  get isMySite(): boolean {
    return this.router.url.includes('/my-sites');
  }

  getFacilityDetails(siteId: string | null, facilityId: string | null): void {
    this.loadingData = true;
    this.infrasysService
      .getFacilityDetails(siteId, facilityId)
      .then((response) => {
        this.loadingData = false;
        this.siteData = response.data.site;
        this.siteFacility = response.data.facility;

        console.log('Details: ', response.data);
      })
      .catch((error) => {
        this.loadingData = false;
        if (this.isMySite) this.router.navigate(['/console/infrasys/my-sites']);
        else this.router.navigate(['/console/infrasys/sites']);
      });
  }
}
