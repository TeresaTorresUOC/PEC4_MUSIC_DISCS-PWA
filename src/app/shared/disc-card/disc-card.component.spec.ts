import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscCardComponent } from './disc-card.component';

describe('DiscCardComponent', () => {
  let component: DiscCardComponent;
  let fixture: ComponentFixture<DiscCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
