import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KithorkinListComponent } from './kithorkin-list.component';

describe('KithorkinListComponent', () => {
  let component: KithorkinListComponent;
  let fixture: ComponentFixture<KithorkinListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KithorkinListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KithorkinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
