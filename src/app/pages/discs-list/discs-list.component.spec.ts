import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscsListComponent } from './discs-list.component';

describe('DiscsListComponent', () => {
  let component: DiscsListComponent;
  let fixture: ComponentFixture<DiscsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
