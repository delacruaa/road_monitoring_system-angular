import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConstructiveModalComponent } from './add-constructive-modal.component';

describe('AddConstructiveModalComponent', () => {
  let component: AddConstructiveModalComponent;
  let fixture: ComponentFixture<AddConstructiveModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddConstructiveModalComponent]
    });
    fixture = TestBed.createComponent(AddConstructiveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
