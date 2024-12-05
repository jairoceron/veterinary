import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMascotaComponent } from './dialog-mascota.component';

describe('DialogMascotaComponent', () => {
  let component: DialogMascotaComponent;
  let fixture: ComponentFixture<DialogMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogMascotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
