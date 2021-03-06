import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { InfrasysService } from 'src/app/services/infrasys.service';

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.scss'],
})
export class SiteDetailsComponent implements OnInit {
  public active: any;
  public loadingData = false;

  public siteData: any = {};
  public siteFacilities = [];
  public siteElements = [];
  public siteActivities = [];
  public siteAddress: any = {};
  public siteArea: any = {};
  public siteContact: any = {};

  constructor(
    public core: CoreService,
    private route: ActivatedRoute,
    private router: Router,
    private infrasysService: InfrasysService
  ) {}

  ngOnInit(): void {
    this.getSiteDetails(this.route.snapshot.paramMap.get('siteId'));
  }

  get isMySite(): boolean {
    return this.router.url.includes('/my-sites');
  }

  getSiteDetails(siteId: string | null): void {
    this.loadingData = true;
    this.infrasysService
      .getSite(siteId)
      .then((response) => {
        this.loadingData = false;
        this.siteData = response.data.site;
        this.siteActivities = response.data.site.activities;
        this.siteElements = response.data.site.elements;
        this.siteFacilities = response.data.site.facilities;
        this.siteAddress = response.data.site.address;
        this.siteArea = response.data.site.area;
        this.siteContact = response.data.site.contact;

        console.log('The elements: ', this.siteElements);
      })
      .catch((error) => {
        this.loadingData = false;
        if (this.isMySite) this.router.navigate(['/console/infrasys/my-sites']);
        else this.router.navigate(['/console/infrasys/sites']);
      });
  }

  onRowExpanding(event: any) {
    event.component.collapseAll(-1);
  }
}
