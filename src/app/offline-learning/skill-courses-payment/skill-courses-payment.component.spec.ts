import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillCoursesPaymentComponent } from './skill-courses-payment.component';

describe('SkillCoursesPaymentComponent', () => {
  let component: SkillCoursesPaymentComponent;
  let fixture: ComponentFixture<SkillCoursesPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillCoursesPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillCoursesPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
