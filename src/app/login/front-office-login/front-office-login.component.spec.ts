import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontOfficeLoginComponent } from './front-office-login.component';

describe('FrontOfficeLoginComponent', () => {
  let component: FrontOfficeLoginComponent;
  let fixture: ComponentFixture<FrontOfficeLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontOfficeLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontOfficeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
