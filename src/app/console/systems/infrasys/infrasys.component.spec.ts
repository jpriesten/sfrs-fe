import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfrasysComponent } from './infrasys.component';

describe('InfrasysComponent', () => {
  let component: InfrasysComponent;
  let fixture: ComponentFixture<InfrasysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfrasysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfrasysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
