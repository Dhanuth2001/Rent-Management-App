import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllRentalsComponent } from './view-all-rentals.component';

describe('ViewAllRentalsComponent', () => {
  let component: ViewAllRentalsComponent;
  let fixture: ComponentFixture<ViewAllRentalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllRentalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllRentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
