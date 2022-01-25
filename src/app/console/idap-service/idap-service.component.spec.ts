import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdapServiceComponent } from './idap-service.component';

describe('IdapServiceComponent', () => {
  let component: IdapServiceComponent;
  let fixture: ComponentFixture<IdapServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdapServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdapServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
