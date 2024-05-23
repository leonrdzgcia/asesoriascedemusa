import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenvideodosComponent } from './examenvideodos.component';

describe('ExamenvideodosComponent', () => {
  let component: ExamenvideodosComponent;
  let fixture: ComponentFixture<ExamenvideodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenvideodosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamenvideodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
