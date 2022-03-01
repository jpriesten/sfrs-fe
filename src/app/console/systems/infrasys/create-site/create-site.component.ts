import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { map, Observable } from 'rxjs';
import { CoreService } from 'src/app/services/core.service';
import { GeneralService } from 'src/app/services/general.service';
import { IdapService } from 'src/app/services/idap.service';
import { InfrasysService } from 'src/app/services/infrasys.service';

@Component({
  selector: 'app-create-site',
  templateUrl: './create-site.component.html',
  styleUrls: ['./create-site.component.scss'],
})
export class CreateSiteComponent implements OnInit {
  unauthorisedCreateSite = { authorised: true, description: '' };
  loadingData = false;
  public siteFormGroup!: FormGroup;

  private tempLocalStorageKeys = ['site-data'];
  public userData: any = undefined;
  public tags: any[] = [];
  public provinces: any[] = [];
  public districts: any[] = [];
  public locals: any[] = [];
  public wards: any[] = [];

  // MatStepper values
  public isLinear = false;
  public stepperOrientation: Observable<StepperOrientation>;

  constructor(
    public core: CoreService,
    private idapService: IdapService,
    private infrasysService: InfrasysService,
    private fb: FormBuilder,
    private generalService: GeneralService,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 600px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.initSiteForm();

    this.hasCarPackChanged();
    if (this.core.user != null) this.getUser(this.core.user.data.user.userName);
  }

  initSiteForm() {
    this.siteFormGroup = this.fb.group({
      name: ['', Validators.required],
      hasCarPark: [false, Validators.required],
      carParkCapacity: [''],
      hasCyclePark: [false, Validators.required],
      hasCycleHire: [false, Validators.required],
      hasCycleRepairWorkshop: [false, Validators.required],
      hasNursery: [false, Validators.required],
      hasFirstAidRoom: [false, Validators.required],
      disabilityAccess: [false, Validators.required],
      managementType: ['', Validators.required],
      managementGroup: ['', Validators.required],
      operatorName: [''],
      ownerType: ['', Validators.required],
      ownerGroup: ['', Validators.required],
      educationPhase: ['', Validators.required],
      startDate: ['', Validators.required],
      buildingName: [''],
      subBuildingName: [''],
      buildingNumber: [''],
      thoroughfareName: ['', Validators.required],
      dependentThoroughfare: [''],
      dependentLocality: [''],
      postTown: ['', Validators.required],
      postCode: ['', Validators.required],
      latitude: [''],
      longitude: [''],
      province: ['', Validators.required],
      district: ['', Validators.required],
      local: ['', Validators.required],
      ward: ['', Validators.required],
    });
  }
  loadGeoForm() {
    let geoData: any = {};
    geoData.province = this.findGeoTag('province')
      ? this.findGeoTag('province').value
      : '';
    geoData.district = this.findGeoTag('district')
      ? this.findGeoTag('district').value
      : '';
    geoData.local = this.findGeoTag('local')
      ? this.findGeoTag('local').value
      : '';
    geoData.ward = this.findGeoTag('ward') ? this.findGeoTag('ward').value : '';

    this.siteFormGroup.patchValue({
      province: geoData.province,
      district: geoData.district,
      local: geoData.local,
      ward: geoData.ward,
    });
  }

  hasCarPackChanged() {
    this.siteFormGroup.controls['hasCarPark'].valueChanges.subscribe((data) => {
      if (data == true) {
        this.siteFormGroup.controls['carParkCapacity'].setValidators(
          Validators.required
        );
        this.siteFormGroup.controls['carParkCapacity'].updateValueAndValidity();
      } else {
        this.siteFormGroup.controls['carParkCapacity'].clearValidators;
        this.siteFormGroup.controls['carParkCapacity'].updateValueAndValidity();
      }
    });
  }

  onGeoChange(data: any, type: string) {
    if (type === 'province') {
      if (this.core.isEmptyOrNull(this.findGeoTag('province'))) {
        let province = this.provinces.find((p) => p.code === data);
        if (!this.core.isEmptyOrNull(province)) {
          this.getProvince(province.name, province.code);
        }
        this.siteFormGroup.controls['district'].setValue('');
        this.siteFormGroup.controls['local'].setValue('');
        this.siteFormGroup.controls['ward'].setValue('');
      }
    } else if (type === 'district') {
      if (this.core.isEmptyOrNull(this.findGeoTag('district'))) {
        let district = this.districts.find((d) => d.code === data);
        if (!this.core.isEmptyOrNull(district)) {
          this.locals = district.locals;
        }
        this.siteFormGroup.controls['local'].setValue('');
        this.siteFormGroup.controls['ward'].setValue('');
      }
    } else if (type === 'local') {
      if (this.core.isEmptyOrNull(this.findGeoTag('local'))) {
        let local = this.locals.find((l) => l.code === data);
        if (!this.core.isEmptyOrNull(local)) {
          this.getlocal(local.name, local.code);
        }
        this.siteFormGroup.controls['ward'].setValue('');
      }
    }
  }

  findGeoTag(geoValue: string) {
    return this.tags.find((t) => t.key == geoValue);
  }

  getUser(userName: string) {
    this.loadingData = true;
    this.idapService
      .getUser(userName)
      .then((response) => {
        this.loadingData = false;
        this.unauthorisedCreateSite.authorised = true;
        this.userData = response.data.user;
        this.tags = response.data.user.tags;
        this.getProvinces();
      })
      .catch((error) => {
        this.loadingData = false;
        this.unauthorisedCreateSite =
          this.core.getUnauthorisedErrorMessage(error);
      });
  }

  getProvinces() {
    let provinceCode = this.findGeoTag('province');
    this.generalService.getProvinces().then((response) => {
      this.provinces = response.data;
      if (!this.core.isEmptyOrNull(provinceCode)) {
        this.siteFormGroup.controls['province'].patchValue(provinceCode.value);
        this.siteFormGroup.controls['province'].disable();
        let province = this.provinces.find(
          (p) => p.code === provinceCode.value
        );
        if (!this.core.isEmptyOrNull(province)) {
          this.getProvince(province.name, province.code);
        }
      }
    });
  }

  getProvince(name: string | null, code: string | null) {
    let districtCode = this.findGeoTag('district');
    if (this.core.isEmptyOrNull(districtCode)) this.loadingData = true;
    this.generalService
      .getProvince(name, code)
      .then((response) => {
        this.districts = response.data.districts;
        if (!this.core.isEmptyOrNull(districtCode)) {
          this.siteFormGroup.controls['district'].patchValue(
            districtCode.value
          );
          this.siteFormGroup.controls['district'].disable();
          let district = this.districts.find(
            (d) => d.code === districtCode.value
          );
          if (!this.core.isEmptyOrNull(district)) {
            this.locals = district.locals;
            let localCode = this.findGeoTag('local');
            if (!this.core.isEmptyOrNull(localCode)) {
              this.siteFormGroup.controls['local'].patchValue(localCode.value);
              this.siteFormGroup.controls['local'].disable();
              let local = this.locals.find((l) => l.code === localCode.value);
              if (!this.core.isEmptyOrNull(local)) {
                this.getlocal(local.name, local.code);
              }
            }
          }
        } else {
          this.loadingData = false;
        }
      })
      .catch(() => {
        if (this.core.isEmptyOrNull(districtCode)) this.loadingData = false;
      });
  }

  getlocal(name: string | null, code: string | null) {
    let wardNumber = this.findGeoTag('ward');
    if (this.core.isEmptyOrNull(wardNumber)) this.loadingData = true;
    this.generalService
      .getLocal(name, code)
      .then((response) => {
        this.wards = response.data.wards;
        if (!this.core.isEmptyOrNull(wardNumber)) {
          this.siteFormGroup.controls['ward'].patchValue(wardNumber.value);
          this.siteFormGroup.controls['ward'].disable();
        } else {
          this.loadingData = false;
        }
      })
      .catch(() => {
        if (this.core.isEmptyOrNull(wardNumber)) this.loadingData = false;
      });
  }

  createSite(stepper: MatStepper) {
    let siteData = {
      name: this.siteFormGroup.getRawValue().name,
      hasCarPark: this.siteFormGroup.getRawValue().hasCarPark,
      carParkCapacity: this.siteFormGroup.getRawValue().carParkCapacity,
      hasCyclePark: this.siteFormGroup.getRawValue().hasCyclePark,
      hasCycleHire: this.siteFormGroup.getRawValue().hasCycleHire,
      hasCycleRepairWorkshop:
        this.siteFormGroup.getRawValue().hasCycleRepairWorkshop,
      hasNursery: this.siteFormGroup.getRawValue().hasNursery,
      hasFirstAidRoom: this.siteFormGroup.getRawValue().hasFirstAidRoom,
      disabilityAccess: this.siteFormGroup.getRawValue().disabilityAccess,
      managementType: this.siteFormGroup.getRawValue().managementType,
      managementGroup: this.siteFormGroup.getRawValue().managementGroup,
      operatorName: this.siteFormGroup.getRawValue().operatorName,
      ownerType: this.siteFormGroup.getRawValue().ownerType,
      ownerGroup: this.siteFormGroup.getRawValue().ownerGroup,
      educationPhase: this.siteFormGroup.getRawValue().educationPhase,
      startDate: this.siteFormGroup.getRawValue().startDate,
      address: {
        buildingName: this.siteFormGroup.getRawValue().buildingName,
        subBuildingName: this.siteFormGroup.getRawValue().subBuildingName,
        buildingNumber: this.siteFormGroup.getRawValue().buildingNumber,
        thoroughfareName: this.siteFormGroup.getRawValue().thoroughfareName,
        dependentThoroughfare:
          this.siteFormGroup.getRawValue().dependentThoroughfare,
        dependentLocality: this.siteFormGroup.getRawValue().dependentLocality,
        postTown: this.siteFormGroup.getRawValue().postTown,
        postCode: this.siteFormGroup.getRawValue().postCode,
        latitude: this.siteFormGroup.getRawValue().latitude,
        longitude: this.siteFormGroup.getRawValue().longitude,
      },
      area: {
        ward: this.siteFormGroup.getRawValue().ward,
        local: this.siteFormGroup.getRawValue().local,
        district: this.siteFormGroup.getRawValue().district,
        province: this.siteFormGroup.getRawValue().province,
      },
    };
    this.loadingData = true;
    this.infrasysService
      .createSite(siteData)
      .then(() => {
        this.loadingData = false;
        this.reset(stepper);
      })
      .catch(() => {
        this.loadingData = false;
      });
  }

  reset(stepper: MatStepper) {
    this.initSiteForm();
    this.loadGeoForm();
    stepper.reset();

    this.tempLocalStorageKeys.forEach((key) => {
      localStorage.removeItem(key);
    });
  }
}
