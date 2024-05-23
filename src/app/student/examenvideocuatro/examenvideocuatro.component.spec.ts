import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenvideocuatroComponent } from './examenvideocuatro.component';

describe('ExamenvideocuatroComponent', () => {
  let component: ExamenvideocuatroComponent;
  let fixture: ComponentFixture<ExamenvideocuatroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenvideocuatroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamenvideocuatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
