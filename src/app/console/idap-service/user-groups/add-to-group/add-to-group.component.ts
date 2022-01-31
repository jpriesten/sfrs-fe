import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { IdapService } from 'src/app/services/idap.service';

@Component({
  selector: 'app-add-to-group',
  templateUrl: './add-to-group.component.html',
  styleUrls: ['./add-to-group.component.scss'],
})
export class AddToGroupComponent implements OnInit {
  public groupName: string | null = '';
  public addType: string | null = '';
  public groupData: any = undefined;

  // Group users
  public groupUsers = [];
  public usersNotInGroup = [];
  public users = [];

  // Group policies
  public groupPolicies = [];
  public policiesNotInGroup = [];
  public policies = [];

  public selectedRows: any[] = [];
  public loadingData = false;
  constructor(
    public core: CoreService,
    private route: ActivatedRoute,
    private idapService: IdapService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.groupName = this.route.snapshot.paramMap.get('groupName');
    this.addType = this.route.snapshot.paramMap.get('addType');
    console.log('Types: ', this.addType);
    if (this.addType == 'users') this.getUsersNotInGroup(this.groupName);
    else if (this.addType == 'policies')
      this.getPoliciesNotInGroup(this.groupName);
  }

  async getUsersNotInGroup(groupName: string | null) {
    try {
      this.loadingData = true;
      let users = await this.idapService.getUsers();
      this.users = users.data.users;
      let groupUsers = await this.idapService.getGroup(groupName);
      this.groupUsers = groupUsers.data.users;
      if (this.users.length != 0) {
        this.usersNotInGroup = this.users.filter((user: any) => {
          return (
            this.groupUsers.find(
              (groupUser: any) => groupUser.userId === user.userId
            ) == undefined
          );
        });
      }
      this.loadingData = false;
    } catch (error) {
      this.loadingData = false;
    }
  }

  async getPoliciesNotInGroup(groupName: string | null) {
    try {
      this.loadingData = true;
      let policies = await this.idapService.getPolicies();
      this.policies = policies.data.policies;
      let groupPolicies = await this.idapService.getGroupPolicies(groupName);
      this.groupPolicies = groupPolicies.data.attachedPolicies;
      if (this.policies.length != 0) {
        this.policiesNotInGroup = this.policies.filter((policy: any) => {
          return (
            this.groupPolicies.find(
              (groupPolicy: any) => groupPolicy.policyId === policy.policyId
            ) == undefined
          );
        });
      }
      this.loadingData = false;
    } catch (error) {
      this.loadingData = false;
    }
  }

  addUsers() {
    this.loadingData = true;
    let successCreation = [];
    let errorCreation: any[] = [];
    this.selectedRows.forEach(async (user: any) => {
      try {
        await this.idapService.addGroupUser(this.groupName, user.userName);
        successCreation.push([user.userName]);
        if (this.selectedRows.length == successCreation.length) {
          this.core.successToast('User(s) successfully added');
          this.loadingData = false;
          this.router.navigate(
            ['/console/idap/user-groups/details', this.groupName],
            { queryParams: { tab: 1 } }
          );
        }
      } catch (error) {
        errorCreation.push([user.userName]);
        this.core.errorToast('Error adding user: ' + user.userName);
        this.loadingData = false;
      }
    });
  }

  addPolicies() {
    this.loadingData = true;
    let successCreation = [];
    let errorCreation: any[] = [];
    this.selectedRows.forEach(async (policy: any) => {
      try {
        await this.idapService.attachPolicies(policy.policyId, this.groupName);
        successCreation.push([policy.policyId]);
        if (this.selectedRows.length == successCreation.length) {
          this.core.successToast('Policies successfully added');
          this.loadingData = false;
          this.router.navigate(
            ['/console/idap/user-groups/details', this.groupName],
            { queryParams: { tab: 2 } }
          );
        }
      } catch (error) {
        errorCreation.push([policy.policyId]);
        this.core.errorToast('Error adding policy: ' + policy.policyName);
        this.loadingData = false;
      }
    });
  }
}
