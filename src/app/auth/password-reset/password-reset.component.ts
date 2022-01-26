import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { IdapService } from 'src/app/services/idap.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  public loadingData = false;
  public resetFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private idapService: IdapService,
    public core: CoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  get formValues() {
    return this.resetFormGroup.value;
  }

  initForm() {
    this.resetFormGroup = this.fb.group({
      username: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(64)]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(256),
          Validators.minLength(3),
        ]),
      ],
      confirmPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(256),
          Validators.minLength(3),
        ]),
      ],
    });
  }

  updateLogin() {
    this.loadingData = true;
    this.idapService
      .updateLoginProfile(this.formValues.username, this.formValues.password)
      .then(async (response) => {
        this.loadingData = false;
        this.core.successToast('Password reset successful!');
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.loadingData = false;
      });
  }
}
