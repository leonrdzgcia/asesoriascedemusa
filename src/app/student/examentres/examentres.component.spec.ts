import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamentresComponent } from './examentres.component';

describe('ExamentresComponent', () => {
  let component: ExamentresComponent;
  let fixture: ComponentFixture<ExamentresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamentresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamentresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
