import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicListComponent } from './graphic-list.component';

describe('GraphicListComponent', () => {
  let component: GraphicListComponent;
  let fixture: ComponentFixture<GraphicListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraphicListComponent]
    });
    fixture = TestBed.createComponent(GraphicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
