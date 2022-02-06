import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    public core: CoreService,
    private router: Router
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
          this.router.navigate(['/password-reset', this.formValues.username]);
        } else this.router.navigate(['/']);
        location.reload();
        localStorage.setItem('currentUser', JSON.stringify(response));
      })
      .catch((error) => {
        this.loadingData = false;
      });
  }
}
