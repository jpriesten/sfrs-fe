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
  public groupData: any = undefined;
  public groupUsers = [];
  public usersNotInGroup = [];
  public users = [];
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
    this.getUsersNotInGroup(this.groupName);
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
          this.router.navigate([
            '/console/idap/user-groups/details',
            this.groupName,
          ]);
        }
      } catch (error) {
        errorCreation.push([user.userName]);
        this.core.errorToast('Error adding user: ' + user.userName);
        this.loadingData = false;
      }
    });
  }
}
