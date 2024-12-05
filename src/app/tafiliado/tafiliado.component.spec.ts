import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TafiliadoComponent } from './tafiliado.component';

describe('TafiliadoComponent', () => {
  let component: TafiliadoComponent;
  let fixture: ComponentFixture<TafiliadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TafiliadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TafiliadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
