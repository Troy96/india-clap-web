import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourLoanApplicationsComponent } from './your-loan-applications.component';

describe('YourLoanApplicationsComponent', () => {
  let component: YourLoanApplicationsComponent;
  let fixture: ComponentFixture<YourLoanApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourLoanApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourLoanApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
