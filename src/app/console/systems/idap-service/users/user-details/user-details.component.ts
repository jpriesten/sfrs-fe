import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { IdapService } from 'src/app/services/idap.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  public userName: string | null = '';
  public userData: any = undefined;
  public userGroups = [];
  public loadingData = false;
  constructor(
    public core: CoreService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private idapService: IdapService
  ) {}

  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('userName');
    this.getUserDetails(this.userName);
    this.getUserGroups(this.userName);
  }

  getUserDetails(userName: string | null): void {
    this.loadingData = true;
    this.idapService
      .getUser(userName)
      .then((response) => {
        this.loadingData = false;
        this.userData = response.data;
      })
      .catch((error) => {
        this.loadingData = false;
      });
  }

  getUserGroups(userName: string | null): void {
    this.loadingData = true;
    this.idapService
      .getUserGroups(userName)
      .then((response) => {
        this.loadingData = false;
        this.userGroups = response.data.groups;
      })
      .catch((error) => {
        this.loadingData = false;
      });
  }
}
