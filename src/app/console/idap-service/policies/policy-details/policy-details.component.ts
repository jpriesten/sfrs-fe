import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { IdapService } from 'src/app/services/idap.service';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.scss'],
})
export class PolicyDetailsComponent implements OnInit {
  public policyId: string | null = '';
  public policyData: any = undefined;
  public groupGroups = [];
  public loadingData = false;
  constructor(
    public core: CoreService,
    private route: ActivatedRoute,
    private idapService: IdapService
  ) {}

  ngOnInit(): void {
    this.policyId = this.route.snapshot.paramMap.get('policyId');
    this.getPolicyDetails(this.policyId);
  }

  getPolicyDetails(policyId: string | null): void {
    this.loadingData = true;
    this.idapService
      .getPolicy(policyId)
      .then((response: any) => {
        this.policyData = response.data.policy;
        this.loadingData = false;
      })
      .catch((error) => {
        this.loadingData = false;
      });
  }
}
