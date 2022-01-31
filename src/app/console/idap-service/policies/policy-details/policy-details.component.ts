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
  public policySummary: any = undefined;
  public policyGroups = [];
  public selectedGroupsRows: any[] = [];

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
        this.policyGroups = response.data.groups;
        this.policySummary = response.data.summary;
        this.loadingData = false;
      })
      .catch((error) => {
        this.loadingData = false;
      });
  }

  detachPolicies() {
    let confirmed = confirm('Are you sure you want to detach groups');
    if (confirmed) {
      this.loadingData = true;
      let successCreation = [];
      let errorCreation: any[] = [];
      this.selectedGroupsRows.forEach(async (group: any) => {
        try {
          await this.idapService.detachPolicies(this.policyId, group.groupName);
          successCreation.push([group.groupName]);
          if (this.selectedGroupsRows.length == successCreation.length) {
            this.core.successToast('Groups successfully detached');
            this.loadingData = false;
            this.getPolicyDetails(this.policyId);
          }
        } catch (error) {
          errorCreation.push([group.groupName]);
          this.core.errorToast('Error detaching group: ' + group.groupName);
          this.loadingData = false;
        }
      });
    }
  }
}
