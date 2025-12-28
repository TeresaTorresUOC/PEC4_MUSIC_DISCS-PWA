import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscGridComponent } from './disc-grid.component';

describe('DiscGridComponent', () => {
  let component: DiscGridComponent;
  let fixture: ComponentFixture<DiscGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
