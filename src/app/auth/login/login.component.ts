import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from '../../services/authentication.service';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loadingData = false;
  public loginformGroup!: FormGroup;

  public user = new User();

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    public core: CoreService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  get formValues() {
    return this.loginformGroup.value;
  }

  initForm() {
    this.loginformGroup = this.fb.group({
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
    });
  }

  login() {
    this.loadingData = true;
    this.authService
      .login(this.formValues.username, this.formValues.password)
      .then((response) => {
        this.user = response;
        console.log('Login success: ', response, this.user);
        this.loadingData = false;
        this.core.successToast('Login successful!');
        if (response.data.user.passwordResetRequired) {
          location.href = '/password-reset';
        } else location.href = '/';
        localStorage.setItem('currentUser', JSON.stringify(response));
      })
      .catch((error) => {
        console.error('Login error: ', error);
        this.loadingData = false;
        if (error && error.errors && error.errors.length != 0) {
          if (error.errors[0].detail == 'InvalidAuthenticationValue') {
            this.core.errorToast(
              'Your authentication information is incorrect. Please try again.'
            );
          } else if (error.errors[0].detail == 'NoSuchEntity') {
            this.core.errorToast(
              'Your authentication information is not found. Please try again.'
            );
          } else {
            this.core.errorToast('Unknown error. Please contact support');
          }
        }
      });
  }
}
