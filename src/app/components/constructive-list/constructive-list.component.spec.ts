import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructiveListComponent } from './constructive-list.component';

describe('ConstructiveListComponent', () => {
  let component: ConstructiveListComponent;
  let fixture: ComponentFixture<ConstructiveListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConstructiveListComponent]
    });
    fixture = TestBed.createComponent(ConstructiveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
