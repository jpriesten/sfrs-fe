import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemotePaginationComponent } from './remote-pagination.component';

describe('RemotePaginationComponent', () => {
  let component: RemotePaginationComponent;
  let fixture: ComponentFixture<RemotePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemotePaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemotePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
