import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingApplicationComponent } from './pending-application.component';

describe('PendingApplicationComponent', () => {
  let component: PendingApplicationComponent;
  let fixture: ComponentFixture<PendingApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
