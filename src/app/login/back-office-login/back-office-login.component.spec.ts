import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeLoginComponent } from './back-office-login.component';

describe('BackOfficeLoginComponent', () => {
  let component: BackOfficeLoginComponent;
  let fixture: ComponentFixture<BackOfficeLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackOfficeLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackOfficeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
