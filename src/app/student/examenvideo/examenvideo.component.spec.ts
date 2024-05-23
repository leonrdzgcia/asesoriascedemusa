import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenvideoComponent } from './examenvideo.component';

describe('ExamenvideoComponent', () => {
  let component: ExamenvideoComponent;
  let fixture: ComponentFixture<ExamenvideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenvideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamenvideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
