import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenvideotresComponent } from './examenvideotres.component';

describe('ExamenvideotresComponent', () => {
  let component: ExamenvideotresComponent;
  let fixture: ComponentFixture<ExamenvideotresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenvideotresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamenvideotresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
