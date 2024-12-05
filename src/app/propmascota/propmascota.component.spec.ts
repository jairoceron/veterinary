import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropmascotaComponent } from './propmascota.component';

describe('PropmascotaComponent', () => {
  let component: PropmascotaComponent;
  let fixture: ComponentFixture<PropmascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropmascotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropmascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
