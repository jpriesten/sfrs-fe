import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IamServiceComponent } from './iam-service.component';

describe('IamServiceComponent', () => {
  let component: IamServiceComponent;
  let fixture: ComponentFixture<IamServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IamServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IamServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
