import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGraphicModalComponent } from './add-graphic-modal.component';

describe('AddGraphicModalComponent', () => {
  let component: AddGraphicModalComponent;
  let fixture: ComponentFixture<AddGraphicModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddGraphicModalComponent]
    });
    fixture = TestBed.createComponent(AddGraphicModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
