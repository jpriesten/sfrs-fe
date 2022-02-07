import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CoreService } from 'src/app/services/core.service';
import { IdapService } from 'src/app/services/idap.service';

@Component({
  selector: 'app-create-policy',
  templateUrl: './create-policy.component.html',
  styleUrls: ['./create-policy.component.scss'],
})
export class CreatePolicyComponent implements OnInit {
  @ViewChild('stepper', { static: false })
  stepper!: MatStepper;

  public loadingData = false;
  public serviceFormGroup!: FormGroup;
  public policyDetailsFormGroup!: FormGroup;

  public isServiceCollapsed = false;
  public services: any[] = [];
  public resourcesInUse: any[] = [];
  public selectedResources: any[] = [];

  // MatStepper values
  public isLinear = true;
  public stepperOrientation: Observable<StepperOrientation>;

  public tags = [{ key: '', value: '', disabled: false }];

  private tempLocalStorageKeys = ['policy-service-data', 'policy-details-data'];

  constructor(
    public core: CoreService,
    private idapService: IdapService,
    private fb: FormBuilder,
    private router: Router,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 600px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.initServiceForm();
    this.loadServiceForm();

    this.initPolicyForm();

    this.getServices();

    this.serviceFormGroup.controls['resourceArray'].valueChanges.subscribe(
      (data: any[]) => {
        data.forEach((value, index) => {
          if (index === 0 && value) {
            this.selectedResources = [];
            this.selectedResources.push('*');
          } else if (index === 0 && !value) {
            this.selectedResources = [];
          } else if (value) {
            this.selectedResources.push(this.resourcesInUse[index]);
          } else if (!value) {
            let selected = this.selectedResources.findIndex(
              (sr) => sr === this.resourcesInUse[index]
            );
            selected != -1 ? this.selectedResources.splice(selected, 1) : '';
          }
          this.serviceFormGroup.controls['resources'].setValue(
            this.selectedResources
          );
        });
      }
    );

    this.serviceFormGroup.controls['allResources'].valueChanges.subscribe(
      (data) => {
        if (data == true) {
          this.resourcesFormArray.controls[0].setValue(data);
          for (let i = 1; i < this.resourcesFormArray.controls.length; i++) {
            this.resourcesFormArray.controls[i].setValue(data);
            this.resourcesFormArray.controls[i].disable();
          }
        } else {
          this.resourcesFormArray.controls[0].setValue(data);
          for (let i = 1; i < this.resourcesFormArray.controls.length; i++) {
            this.resourcesFormArray.controls[i].enable();
            this.resourcesFormArray.controls[i].setValue(data);
          }
        }
      }
    );
  }

  ngAfterViewInit() {
    // viewChild is set after the view has been initialized
    let data = undefined;
    if (
      !this.core.isEmptyOrNull(
        localStorage.getItem(this.tempLocalStorageKeys[1])
      )
    ) {
      data = JSON.parse(localStorage.getItem(this.tempLocalStorageKeys[1])!);
      this.stepper.selectedIndex =
        data != null || data != undefined ? data.completedStep : 0;
      this.stepper.selectedIndex =
        data != null || data != undefined ? data.completedStep + 1 : 0;
    } else if (
      !this.core.isEmptyOrNull(
        localStorage.getItem(this.tempLocalStorageKeys[0])
      )
    ) {
      data = JSON.parse(localStorage.getItem(this.tempLocalStorageKeys[0])!);
      this.stepper.selectedIndex =
        data != null || data != undefined ? data.completedStep + 1 : 0;
    }
  }

  initServiceForm() {
    this.serviceFormGroup = this.fb.group({
      service: ['', Validators.required],
      allResources: [],
      resources: ['', Validators.required],
      resourceArray: new FormArray([]),
      tags: [],
    });
  }
  loadServiceForm() {
    if (
      !this.core.isEmptyOrNull(
        localStorage.getItem(this.tempLocalStorageKeys[0])
      )
    ) {
      let serviceData = JSON.parse(
        localStorage.getItem(this.tempLocalStorageKeys[0])!
      );
      serviceData.resourceArray.forEach((resource: any) =>
        this.resourcesFormArray.push(new FormControl(resource))
      );
      this.resourcesInUse = serviceData.service.resources;

      if (serviceData.tags == null || serviceData.tags.length == 0) {
        this.tags = [{ key: '', value: '', disabled: false }];
      } else {
        this.tags = serviceData.tags;
      }

      this.serviceFormGroup.patchValue({
        service: serviceData.service,
        allResources: serviceData.allResources,
        resources: serviceData.resources,
        tags: serviceData.tags,
      });
    }
  }

  initPolicyForm() {
    this.policyDetailsFormGroup = this.fb.group({
      policyName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(128),
          Validators.minLength(3),
        ]),
      ],
      description: [
        '',
        Validators.compose([
          Validators.maxLength(1000),
          Validators.minLength(3),
        ]),
      ],
    });
  }

  get resourcesFormArray() {
    return this.serviceFormGroup.controls['resourceArray'] as FormArray;
  }

  selectService(selectedService: any) {
    this.serviceFormGroup.controls['service'].setValue(selectedService);
    this.resourcesInUse = selectedService.resources;
    this.isServiceCollapsed = !this.isServiceCollapsed;
    this.resourcesFormArray.clear();
    this.serviceFormGroup.value.service.resources.forEach(() =>
      this.resourcesFormArray.push(new FormControl(false))
    );
  }

  addTag(index: number) {
    this.tags[index].disabled = true;
    this.tags.push({ key: '', value: '', disabled: false });
  }
  removeTag(index: number) {
    this.tags.splice(index, 1);
  }

  async createPolicy() {
    try {
      this.loadingData = true;

      let policyData = {
        policyName: this.policyDetailsFormGroup.value.policyName,
        description: this.policyDetailsFormGroup.value.description,
        policyDocument: {
          actions: [
            {
              service: this.serviceFormGroup.value.service.service,
              resources: this.serviceFormGroup.value.resources,
            },
          ],
          effect: 'allow',
        },
        tags: this.serviceFormGroup.value.tags,
      };
      await this.idapService.createPolicy(policyData);
      this.loadingData = false;
      this.router.navigate(['/console/idap/policies']);
    } catch (error) {
      this.loadingData = false;
    }
  }

  getServices() {
    this.loadingData = true;
    this.idapService
      .getServices()
      .then((response) => {
        this.loadingData = false;
        this.services = response.data.actions;
      })
      .catch(() => {
        this.loadingData = false;
      });
  }

  nextStep(stepper: MatStepper) {
    if (stepper.selectedIndex == 0) {
      localStorage.setItem(
        this.tempLocalStorageKeys[0],
        JSON.stringify({
          ...this.serviceFormGroup.getRawValue(),
          completedStep: stepper.selectedIndex,
        })
      );
      stepper.next();
    } else if (stepper.selectedIndex == 1) {
      let tagsCopy = this.core._lodashRef.cloneDeep(this.tags);
      tagsCopy.splice(tagsCopy.length - 1, 1);
      tagsCopy.map((tag) => {
        this.core.sanitiseRequestObject(tag, '', 'disabled');
      });
      this.serviceFormGroup.controls['tags'].setValue([...tagsCopy]);
      localStorage.setItem(
        this.tempLocalStorageKeys[0],
        JSON.stringify({
          ...this.serviceFormGroup.getRawValue(),
          completedStep: stepper.selectedIndex,
        })
      );
      stepper.next();
    } else {
      this.serviceFormGroup.reset();
      this.policyDetailsFormGroup.reset();
      stepper.reset();

      this.tempLocalStorageKeys.forEach((key) => {
        localStorage.removeItem(key);
      });
    }
  }
}
