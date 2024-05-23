import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenestresComponent } from './examenestres.component';

describe('ExamenestresComponent', () => {
  let component: ExamenestresComponent;
  let fixture: ComponentFixture<ExamenestresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenestresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamenestresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
