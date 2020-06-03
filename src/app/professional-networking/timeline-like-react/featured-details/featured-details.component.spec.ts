import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedDetailsComponent } from './featured-details.component';

describe('FeaturedDetailsComponent', () => {
  let component: FeaturedDetailsComponent;
  let fixture: ComponentFixture<FeaturedDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
