import { StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CoreService } from 'src/app/services/core.service';
import { IdapService } from 'src/app/services/idap.service';
import { MatStepper } from '@angular/material/stepper';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit, AfterViewInit {
  @ViewChild('createGroupModal', { static: false })
  createGroupModal: any;
  @ViewChild('stepper', { static: false })
  stepper!: MatStepper;

  public loadingData = false;
  public userFormGroup!: FormGroup;
  public userProfileFormGroup!: FormGroup;

  public groupFormGroup!: FormGroup;
  public modalTitle = '';

  public groups = [];
  public provinces: any[] = [];
  public districts: any[] = [];
  public locals: any[] = [];
  public wards: any[] = [];
  public selectedRows: any[] = [];

  // MatStepper values
  public isLinear = true;
  public stepperOrientation: Observable<StepperOrientation>;

  public provinceTag: any = { key: 'province', value: '' };
  public districtTag: any = { key: 'district', value: '' };
  public localTag: any = { key: 'local', value: '' };
  public wardTag = { key: 'ward', value: '' };
  public defaultTags: any[] = [];
  public tags = [{ key: '', value: '', disabled: false }];

  private tempLocalStorageKeys = [
    'user-group-data',
    'user-profile-data',
    'new-user-detail',
  ];

  constructor(
    public core: CoreService,
    private idapService: IdapService,
    private fb: FormBuilder,
    private generalService: GeneralService,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 600px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.initUserForm();
    this.loadUserForm();

    this.initUserProfileForm();
    this.passwordTypeChange();

    this.initGroupForm();

    this.loadGeoData();
  }

  ngAfterViewInit() {
    // viewChild is set after the view has been initialized
    let data = undefined;
    if (
      !this.core.isEmptyOrNull(
        localStorage.getItem(this.tempLocalStorageKeys[0])
      )
    ) {
      data = JSON.parse(localStorage.getItem(this.tempLocalStorageKeys[0])!);
      this.stepper.selectedIndex =
        data != null || data != undefined ? data.completedStep - 1 : 0;
      this.stepper.selectedIndex =
        data != null || data != undefined ? data.completedStep : 0;
      this.stepper.selectedIndex =
        data != null || data != undefined ? data.completedStep + 1 : 0;
    } else if (
      !this.core.isEmptyOrNull(
        localStorage.getItem(this.tempLocalStorageKeys[1])
      )
    ) {
      data = JSON.parse(localStorage.getItem(this.tempLocalStorageKeys[1])!);
      this.stepper.selectedIndex =
        data != null || data != undefined ? data.completedStep : 0;
      this.stepper.selectedIndex =
        data != null || data != undefined ? data.completedStep + 1 : 0;
      this.getGroups();
    } else if (
      !this.core.isEmptyOrNull(
        localStorage.getItem(this.tempLocalStorageKeys[2])
      )
    ) {
      data = JSON.parse(localStorage.getItem(this.tempLocalStorageKeys[2])!);
      this.stepper.selectedIndex =
        data != null || data != undefined ? data.completedStep + 1 : 0;
    }
  }

  initUserForm() {
    this.userFormGroup = this.fb.group({
      userName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(256),
          Validators.minLength(3),
        ]),
      ],
      tags: [],
      defaultTags: [],
      newUser: [],
    });
  }
  loadUserForm() {
    if (
      !this.core.isEmptyOrNull(
        localStorage.getItem(this.tempLocalStorageKeys[2])
      )
    ) {
      let newUserData = JSON.parse(
        localStorage.getItem(this.tempLocalStorageKeys[2])!
      );
      this.userFormGroup.patchValue({
        userName: newUserData.userName,
      });
    }
  }

  initUserProfileForm() {
    this.userProfileFormGroup = this.fb.group({
      passwordType: ['auto', Validators.required],
      password: [''],
      requirePasswordReset: [true],
    });
    this.userProfileFormGroup.controls['password'].disable();
  }

  passwordTypeChange() {
    this.userProfileFormGroup.controls['passwordType'].valueChanges.subscribe(
      (value: string) => {
        if (value == 'custom') {
          this.userProfileFormGroup.controls['password'].enable();
          this.userProfileFormGroup.controls['password'].setValidators(
            Validators.compose([
              Validators.required,
              Validators.maxLength(256),
              Validators.minLength(3),
            ])
          );
          this.userProfileFormGroup.controls[
            'password'
          ].updateValueAndValidity();
        } else {
          this.userProfileFormGroup.controls['password'].disable();
        }
      }
    );
  }

  initGroupForm() {
    this.groupFormGroup = this.fb.group({
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

  loadGeoData() {
    this.getProvinces();
  }

  addTag(index: number) {
    this.tags[index].disabled = true;
    this.tags.push({ key: '', value: '', disabled: false });
  }
  addDefaultTag(type: string, tag: any) {
    let foundTag = this.defaultTags.findIndex((tag: any) => tag.key == type);
    if (foundTag != -1) {
      if (!this.core.isEmptyOrNull(tag.value))
        this.defaultTags.splice(foundTag, 1, tag);
      else this.defaultTags.splice(foundTag, 1);
    } else this.defaultTags.push(tag);
  }
  removeTag(index: number) {
    this.tags.splice(index, 1);
  }
  onGeoChange(type: string) {
    if (type === 'province') {
      this.addDefaultTag(type, {
        key: this.provinceTag.key,
        value: this.provinceTag.value.provinceId,
      });
      this.getProvince(
        this.provinceTag.value.name,
        this.provinceTag.value.code
      );
    } else if (type === 'district') {
      this.addDefaultTag(type, {
        key: this.districtTag.key,
        value: this.districtTag.value.districtMunicipalityId,
      });
      this.locals = this.districtTag.value.locals;
    } else if (type === 'local') {
      this.addDefaultTag(type, {
        key: this.localTag.key,
        value: this.localTag.value.localMunicipalityId,
      });
      this.getlocal(this.localTag.value.name, this.localTag.value.code);
    } else if (type === 'ward') {
      this.addDefaultTag(type, this.wardTag);
    }
  }

  get password() {
    let data = JSON.parse(localStorage.getItem(this.tempLocalStorageKeys[1])!);
    return data?.password;
  }

  async createUserDetail(stepper: MatStepper) {
    try {
      this.loadingData = true;
      let tagsCopy = this.core._lodashRef.cloneDeep(this.tags);
      tagsCopy.splice(tagsCopy.length - 1, 1);
      tagsCopy.map((tag) => {
        this.core.sanitiseRequestObject(tag, '', 'disabled');
      });
      this.userFormGroup.controls['tags'].setValue([
        ...this.defaultTags,
        ...tagsCopy,
      ]);
      console.log(this.userFormGroup.getRawValue());
      let newUser = await this.idapService.createUser(
        this.userFormGroup.value.userName,
        this.userFormGroup.value.tags
      );
      this.loadingData = false;
      this.userFormGroup.controls['newUser'].setValue(newUser);
      localStorage.setItem(
        this.tempLocalStorageKeys[2],
        JSON.stringify({
          ...this.userFormGroup.value,
          completedStep: stepper.selectedIndex,
        })
      );
      stepper.next();
      console.log('New user: ', newUser, this.userFormGroup.value);
    } catch (error) {
      this.loadingData = false;
    }
  }

  async createLoginProfile(stepper: MatStepper) {
    try {
      this.loadingData = true;

      if (this.userProfileFormGroup.value.passwordType === 'auto') {
        this.userProfileFormGroup.controls['password'].setValue(
          this.core.generatePassword()
        );
      }
      let newUser = await this.idapService.createLoginProfile(
        this.userFormGroup.value.userName,
        this.userProfileFormGroup.getRawValue().password,
        this.userProfileFormGroup.value.requirePasswordReset
      );
      this.loadingData = false;
      localStorage.setItem(
        this.tempLocalStorageKeys[1],
        JSON.stringify({
          ...this.userProfileFormGroup.getRawValue(),
          completedStep: stepper.selectedIndex,
        })
      );
      stepper.next();
      this.getGroups();
    } catch (error) {
      this.loadingData = false;
    }
  }

  addUserToGroup(stepper: MatStepper) {
    this.loadingData = true;
    let successCreation = [];
    let errorCreation = [];
    this.selectedRows.forEach(async (group: any, index) => {
      try {
        await this.idapService.addGroupUser(
          group.groupName,
          this.userFormGroup.value.userName
        );
        successCreation.push([group.groupName, index]);
        if (this.selectedRows.length == successCreation.length) {
          localStorage.setItem(
            this.tempLocalStorageKeys[0],
            JSON.stringify({
              rows: this.selectedRows,
              completedStep: stepper.selectedIndex,
            })
          );
          stepper.next();
        }
      } catch (error) {
        errorCreation.push([group.groupName, index]);
      }
    });
    this.loadingData = false;
  }

  getGroups() {
    this.loadingData = true;
    this.idapService
      .getGroups()
      .then((response) => {
        this.loadingData = false;
        this.groups = response.data.groups;
      })
      .catch(() => {
        this.loadingData = false;
      });
  }

  getProvinces() {
    this.generalService.getProvinces().then((response) => {
      this.provinces = response.data;
    });
  }

  getProvince(name: string | null, code: string | null) {
    this.loadingData = true;
    this.generalService
      .getProvince(name, code)
      .then((response) => {
        this.districts = response.data.districts;
        this.loadingData = false;
      })
      .catch(() => {
        this.loadingData = false;
      });
  }

  getlocal(name: string | null, code: string | null) {
    this.loadingData = true;
    this.generalService
      .getLocal(name, code)
      .then((response) => {
        // this.wards = response.data.wards;
        this.loadingData = false;
      })
      .catch(() => {
        this.loadingData = false;
      });
  }

  openCreateGroupModal(modalTitle: string) {
    this.modalTitle = modalTitle;
    this.core
      .openModal(this.createGroupModal)
      .then((response) => {
        this.getGroups();
      })
      .catch(() => {});
  }
  async createGroup() {
    try {
      this.loadingData = true;
      await this.idapService.createGroup(this.groupFormGroup.value.groupName);
      this.loadingData = false;
      this.core.closeModal();
    } catch (error) {
      this.loadingData = false;
    }
  }

  nextStep(stepper: MatStepper) {
    console.log('Current step index: ', stepper.selectedIndex);

    if (stepper.selectedIndex == 0) {
      this.createUserDetail(stepper);
    } else if (stepper.selectedIndex == 1) {
      this.createLoginProfile(stepper);
    } else if (stepper.selectedIndex == 2) {
      this.addUserToGroup(stepper);
    } else {
      this.userFormGroup.reset();
      this.userProfileFormGroup.reset();
      stepper.reset();

      this.tempLocalStorageKeys.forEach((key) => {
        localStorage.removeItem(key);
      });
    }
  }

  // Function to show or hide a password by taking in the ID of the password input field
  showHidePassword(passwordRef: string) {
    let passwordInputField = document.getElementById(
      passwordRef
    ) as HTMLInputElement;
    if (passwordInputField.type === 'password') {
      passwordInputField.type = 'text';
    } else {
      passwordInputField.type = 'password';
    }
  }
}
