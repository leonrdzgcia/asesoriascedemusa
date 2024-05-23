import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentmComponent } from './dialog-contentm.component';

describe('DialogContentmComponent', () => {
  let component: DialogContentmComponent;
  let fixture: ComponentFixture<DialogContentmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogContentmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogContentmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
