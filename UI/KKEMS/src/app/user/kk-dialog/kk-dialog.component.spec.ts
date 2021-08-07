import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KkDialogComponent } from './kk-dialog.component';

describe('KkDialogComponent', () => {
  let component: KkDialogComponent;
  let fixture: ComponentFixture<KkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KkDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
