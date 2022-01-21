import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { IdapService } from 'src/app/services/idap.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  public loadingData = false;
  public userFormGroup!: FormGroup;

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
    this.userFormGroup = this.fb.group({
      userName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(256),
          Validators.minLength(3),
        ]),
      ],
    });
  }

  createUser() {}
}
