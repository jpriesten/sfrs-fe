import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/models/user-groups';
import { CoreService } from 'src/app/services/core.service';
import { IdapService } from 'src/app/services/idap.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss'],
})
export class GroupDetailsComponent implements OnInit {
  public groupName: string | null = '';
  public groupData: any = undefined;
  public groupUsers = [];
  public groupPolicies = [];
  public loadingData = false;
  constructor(
    public core: CoreService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private idapService: IdapService
  ) {}

  ngOnInit(): void {
    this.groupName = this.route.snapshot.paramMap.get('groupName');
    this.getGroupDetails(this.groupName);
  }

  getGroupDetails(groupName: string | null): void {
    this.loadingData = true;
    this.idapService
      .getGroup(groupName)
      .then((response) => {
        this.loadingData = false;
        this.groupData = response.data.group;
        this.groupUsers = response.data.users;
        console.log('Data: ', response.data);
      })
      .catch((error) => {
        this.loadingData = false;
      });
  }
}
