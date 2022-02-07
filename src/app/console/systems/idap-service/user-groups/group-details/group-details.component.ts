import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { IdapService } from 'src/app/services/idap.service';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss'],
})
export class GroupDetailsComponent implements OnInit {
  public groupName: string | null = '';
  public groupData: any = undefined;
  public groupSummary: any = undefined;
  public groupUsers = [];
  public groupPolicies = [];

  public selectedPoliciesRows: any[] = [];

  public active: any;
  public loadingData = false;

  constructor(
    public core: CoreService,
    private route: ActivatedRoute,
    private idapService: IdapService
  ) {}

  ngOnInit(): void {
    this.groupName = this.route.snapshot.paramMap.get('groupName');
    this.route.queryParams.subscribe((params: any) => {
      if (Object.keys(params).length != 0) {
        this.active = Number(params['tab']);
        if (this.active == 2) {
          this.getGroupPolicies(this.groupName);
        }
      }
    });
    this.getGroupDetails(this.groupName);
  }

  getGroupDetails(groupName: string | null): void {
    this.loadingData = true;
    this.idapService
      .getGroup(groupName)
      .then((response) => {
        this.loadingData = false;
        this.groupData = response.data.group;
        this.groupSummary = response.data.summary;
        this.groupUsers = response.data.users;
      })
      .catch((error) => {
        this.loadingData = false;
      });
  }

  getGroupPolicies(groupName: string | null) {
    this.idapService.getGroupPolicies(groupName).then((response) => {
      this.groupPolicies = response.data.attachedPolicies;
    });
  }

  detachPolicies() {
    let confirmed = confirm('Are you sure you want to detach policies');
    if (confirmed) {
      this.loadingData = true;
      let successCreation = [];
      let errorCreation: any[] = [];
      this.selectedPoliciesRows.forEach(async (policy: any) => {
        try {
          await this.idapService.detachPolicies(
            policy.policyId,
            this.groupName
          );
          successCreation.push([policy.policyId]);
          if (this.selectedPoliciesRows.length == successCreation.length) {
            this.core.successToast('Policies successfully detached');
            this.loadingData = false;
            this.getGroupPolicies(this.groupName);
            this.getGroupDetails(this.groupName);
          }
        } catch (error) {
          errorCreation.push([policy.policyId]);
          this.core.errorToast('Error detaching policy: ' + policy.policyName);
          this.loadingData = false;
        }
      });
    }
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 2) {
      this.getGroupPolicies(this.groupName);
    }
  }
}
