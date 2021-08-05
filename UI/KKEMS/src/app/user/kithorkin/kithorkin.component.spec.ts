import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KithorkinComponent } from './kithorkin.component';

describe('KithorkinComponent', () => {
  let component: KithorkinComponent;
  let fixture: ComponentFixture<KithorkinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KithorkinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KithorkinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
