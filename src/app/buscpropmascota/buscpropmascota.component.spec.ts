import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscpropmascotaComponent } from './buscpropmascota.component';

describe('BuscpropmascotaComponent', () => {
  let component: BuscpropmascotaComponent;
  let fixture: ComponentFixture<BuscpropmascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscpropmascotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscpropmascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
