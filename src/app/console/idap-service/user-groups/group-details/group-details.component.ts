import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/models/user-groups';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss'],
})
export class GroupDetailsComponent implements OnInit {
  public groupName: string | null = '';
  public groupData: Group | undefined = new Group();
  public groupUsers = [];
  public groupPolicies = [];
  public loadingData = false;
  constructor(
    public core: CoreService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const groupData = this.router.getCurrentNavigation()?.extras.state;
    if (groupData !== undefined) this.groupData = groupData['group'] as Group;
    else {
      this.groupData = undefined;
      this.router.navigate(['console/idap/user-groups']);
    }
    console.log('Group data: ', groupData, this.groupData);
  }

  ngOnInit(): void {
    this.groupName = this.route.snapshot.paramMap.get('groupName');
  }
}
