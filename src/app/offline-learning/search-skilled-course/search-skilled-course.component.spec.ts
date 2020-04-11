import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSkilledCourseComponent } from './search-skilled-course.component';

describe('SearchSkilledCourseComponent', () => {
  let component: SearchSkilledCourseComponent;
  let fixture: ComponentFixture<SearchSkilledCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSkilledCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSkilledCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
