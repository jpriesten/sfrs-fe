import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { IdapService } from 'src/app/services/idap.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss'],
})
export class PoliciesComponent implements OnInit {
  policies = [];
  loadingData = false;

  public selectedRows: any[] = [];

  constructor(public core: CoreService, private idapService: IdapService) {}

  ngOnInit(): void {
    this.getPolicies();
  }

  getPolicies() {
    this.loadingData = true;
    this.idapService
      .getPolicies()
      .then((response) => {
        this.loadingData = false;
        this.policies = response.data.policies;
      })
      .catch((error) => {
        this.loadingData = false;
      });
  }
}
