import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { IdapService } from 'src/app/services/idap.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent implements OnInit {
  public loadingData = false;
  public groupformGroup!: FormGroup;

  constructor(
    public core: CoreService,
    private idapService: IdapService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.groupformGroup = this.fb.group({
      groupName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(256),
          Validators.minLength(3),
        ]),
      ],
    });
  }

  async createGroup() {
    try {
      this.loadingData = true;
      await this.idapService.createGroup(this.groupformGroup.value.groupName);
      this.loadingData = false;
      this.router.navigate(['/console/idap/user-groups']);
    } catch (error) {
      this.loadingData = false;
    }
  }
}
